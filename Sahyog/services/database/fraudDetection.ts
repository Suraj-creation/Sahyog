/**
 * SAHAYOG Fraud Detection Service
 * ML/DL-ready data preparation and anomaly detection
 * 
 * Based on unified.md Module 11: Intelligent Fraud Detection & Protection System
 */

import { mongoService, dbConfig } from './mongoService';
import { 
  WorkRecordDocument, 
  PaymentDocument, 
  FraudAlertDocument, 
  AnomalyFlag,
  AnomalyType,
  FraudDetectionFeatures 
} from './schemas';

// ============================================
// FRAUD DETECTION RULES ENGINE
// ============================================

interface FraudRule {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  check: (data: any) => AnomalyFlag | null;
}

const FRAUD_RULES: FraudRule[] = [
  // Location-based rules
  {
    id: 'location_mismatch',
    name: 'Location Mismatch',
    description: 'Check-in location is far from worksite',
    severity: 'high',
    check: (workRecord: WorkRecordDocument) => {
      if (!workRecord.checkInLocation || !workRecord.worksite?.location) return null;
      
      const distance = calculateDistance(
        workRecord.checkInLocation.lat,
        workRecord.checkInLocation.lng,
        workRecord.worksite.location.lat,
        workRecord.worksite.location.lng
      );
      
      if (distance > 5) { // More than 5 km
        return {
          type: 'location_mismatch',
          severity: distance > 10 ? 'critical' : 'high',
          description: `Check-in location is ${distance.toFixed(1)} km from worksite`,
          detectedAt: new Date().toISOString()
        };
      }
      return null;
    }
  },

  // Time-based rules
  {
    id: 'excessive_hours',
    name: 'Excessive Hours',
    description: 'Worker logged more than 12 hours in a day',
    severity: 'medium',
    check: (workRecord: WorkRecordDocument) => {
      if (!workRecord.hoursWorked) return null;
      
      if (workRecord.hoursWorked > 12) {
        return {
          type: 'excessive_hours',
          severity: workRecord.hoursWorked > 16 ? 'critical' : 'medium',
          description: `Worker logged ${workRecord.hoursWorked} hours in one day`,
          detectedAt: new Date().toISOString()
        };
      }
      return null;
    }
  },

  // Time anomaly
  {
    id: 'time_anomaly',
    name: 'Unusual Check-in Time',
    description: 'Check-in at unusual hours (before 5 AM or after 10 PM)',
    severity: 'low',
    check: (workRecord: WorkRecordDocument) => {
      if (!workRecord.checkInTime) return null;
      
      const hour = new Date(workRecord.checkInTime).getHours();
      if (hour < 5 || hour > 22) {
        return {
          type: 'time_anomaly',
          severity: 'low',
          description: `Check-in at unusual hour: ${hour}:00`,
          detectedAt: new Date().toISOString()
        };
      }
      return null;
    }
  },

  // Payment mismatch
  {
    id: 'payment_mismatch',
    name: 'Payment Mismatch',
    description: 'Payment amount doesn\'t match calculated wages',
    severity: 'high',
    check: (payment: PaymentDocument & { expectedAmount?: number }) => {
      if (!payment.expectedAmount) return null;
      
      const difference = Math.abs(payment.amount - payment.expectedAmount);
      const percentDiff = (difference / payment.expectedAmount) * 100;
      
      if (percentDiff > 10) { // More than 10% difference
        return {
          type: 'payment_mismatch',
          severity: percentDiff > 25 ? 'critical' : 'high',
          description: `Payment ₹${payment.amount} differs from expected ₹${payment.expectedAmount} by ${percentDiff.toFixed(1)}%`,
          detectedAt: new Date().toISOString()
        };
      }
      return null;
    }
  }
];

// ============================================
// FRAUD DETECTION SERVICE
// ============================================

export class FraudDetectionService {
  
  /**
   * Analyze a work record for fraud indicators
   */
  async analyzeWorkRecord(workRecord: WorkRecordDocument): Promise<AnomalyFlag[]> {
    const anomalies: AnomalyFlag[] = [];

    for (const rule of FRAUD_RULES) {
      const result = rule.check(workRecord);
      if (result) {
        anomalies.push(result);
      }
    }

    // Update work record with anomaly flags
    if (anomalies.length > 0) {
      await mongoService.updateOne(
        dbConfig.collections.workRecords,
        { _id: workRecord._id },
        { 
          anomalyFlags: anomalies,
          riskScore: this.calculateRiskScore(anomalies)
        }
      );
    }

    return anomalies;
  }

  /**
   * Analyze a payment for fraud indicators
   */
  async analyzePayment(payment: PaymentDocument): Promise<AnomalyFlag[]> {
    const anomalies: AnomalyFlag[] = [];

    // Check for duplicate payments
    const duplicates = await this.checkDuplicatePayments(payment);
    if (duplicates.length > 0) {
      anomalies.push({
        type: 'duplicate_payments' as AnomalyType,
        severity: 'critical',
        description: `Possible duplicate payments found: ${duplicates.length} similar transactions`,
        detectedAt: new Date().toISOString()
      });
    }

    // Run payment-specific rules
    for (const rule of FRAUD_RULES) {
      const result = rule.check(payment);
      if (result) {
        anomalies.push(result);
      }
    }

    // Update payment record
    if (anomalies.length > 0) {
      await mongoService.updateOne(
        dbConfig.collections.payments,
        { _id: payment._id },
        { 
          flagged: true,
          flagReason: anomalies.map(a => a.description).join('; '),
          riskScore: this.calculateRiskScore(anomalies)
        }
      );
    }

    return anomalies;
  }

  /**
   * Check for duplicate payments
   */
  private async checkDuplicatePayments(payment: PaymentDocument): Promise<PaymentDocument[]> {
    const result = await mongoService.find<PaymentDocument>(
      dbConfig.collections.payments,
      { 
        userId: payment.userId,
        amount: payment.amount
      }
    );

    // Filter for payments within 24 hours
    const recentPayments = (result.data || []).filter(p => {
      if (p._id === payment._id) return false;
      const timeDiff = Math.abs(
        new Date(p.initiatedAt).getTime() - new Date(payment.initiatedAt).getTime()
      );
      return timeDiff < 24 * 60 * 60 * 1000; // 24 hours
    });

    return recentPayments;
  }

  /**
   * Calculate overall risk score (0-100)
   */
  calculateRiskScore(anomalies: AnomalyFlag[]): number {
    if (anomalies.length === 0) return 0;

    const severityWeights = {
      low: 10,
      medium: 25,
      high: 50,
      critical: 80
    };

    const totalWeight = anomalies.reduce(
      (sum, a) => sum + severityWeights[a.severity],
      0
    );

    return Math.min(100, totalWeight);
  }

  /**
   * Create a fraud alert
   */
  async createFraudAlert(
    alertType: FraudAlertDocument['alertType'],
    severity: FraudAlertDocument['severity'],
    evidence: FraudAlertDocument['evidence'],
    involvedEntities: {
      users?: string[];
      worksites?: string[];
      officials?: string[];
      transactions?: string[];
    },
    affectedArea: FraudAlertDocument['affectedArea']
  ): Promise<string | null> {
    const alert: FraudAlertDocument = {
      alertId: `FRAUD-${Date.now().toString(36).toUpperCase()}`,
      alertType,
      severity,
      detectedAt: new Date().toISOString(),
      detectedBy: 'rule_engine',
      involvedUsers: involvedEntities.users,
      involvedWorksites: involvedEntities.worksites,
      involvedOfficials: involvedEntities.officials,
      involvedTransactions: involvedEntities.transactions,
      evidence,
      affectedArea,
      status: 'detected'
    };

    const result = await mongoService.insertOne(dbConfig.collections.fraudAlerts, alert);
    
    console.log(`[FraudDetection] 🚨 Alert created: ${alert.alertId} - ${alertType}`);
    
    return result.insertedId || null;
  }

  /**
   * Export data for ML/DL training
   */
  async exportForML(startDate: string, endDate: string): Promise<FraudDetectionFeatures[]> {
    const features: FraudDetectionFeatures[] = [];

    // Get work records in date range
    const workRecords = await mongoService.aggregate<WorkRecordDocument>(
      dbConfig.collections.workRecords,
      [
        {
          $match: {
            date: { $gte: startDate, $lte: endDate }
          }
        }
      ]
    );

    if (!workRecords.data) return features;

    // Group by worker
    const workerRecords = new Map<string, WorkRecordDocument[]>();
    for (const record of workRecords.data) {
      const existing = workerRecords.get(record.userId) || [];
      existing.push(record);
      workerRecords.set(record.userId, existing);
    }

    // Generate features for each worker
    for (const [workerId, records] of workerRecords) {
      const feature = this.generateWorkerFeatures(workerId, records);
      features.push(feature);
    }

    return features;
  }

  /**
   * Generate ML features for a worker
   */
  private generateWorkerFeatures(
    workerId: string, 
    records: WorkRecordDocument[]
  ): FraudDetectionFeatures {
    const hoursWorked = records.map(r => r.hoursWorked || 0);
    const avgHours = hoursWorked.reduce((a, b) => a + b, 0) / hoursWorked.length || 0;

    // Calculate location variance
    const validLocations = records.filter(r => r.checkInLocation && r.worksite?.location);
    const distances = validLocations.map(r => 
      calculateDistance(
        r.checkInLocation!.lat,
        r.checkInLocation!.lng,
        r.worksite!.location.lat,
        r.worksite!.location.lng
      )
    );
    const locationVariance = distances.length > 0 
      ? distances.reduce((a, b) => a + b, 0) / distances.length 
      : 0;

    // Calculate check-in time patterns
    const checkInHours = records
      .filter(r => r.checkInTime)
      .map(r => new Date(r.checkInTime!).getHours());
    const avgCheckIn = checkInHours.length > 0
      ? checkInHours.reduce((a, b) => a + b, 0) / checkInHours.length
      : 8;

    // Calculate attendance consistency
    const attendanceDays = new Set(records.map(r => r.date)).size;
    const dateRange = records.length > 0
      ? Math.ceil((new Date(records[records.length - 1].date).getTime() - 
                   new Date(records[0].date).getTime()) / (1000 * 60 * 60 * 24)) + 1
      : 1;
    const attendanceConsistency = Math.min(1, attendanceDays / dateRange);

    // Check for anomalies (labels for supervised learning)
    const hasAnomalies = records.some(r => r.anomalyFlags && r.anomalyFlags.length > 0);
    const anomalyTypes = records
      .flatMap(r => r.anomalyFlags || [])
      .map(a => a.type);

    return {
      workerId,
      daysWorkedTotal: records.length,
      averageHoursPerDay: avgHours,
      paymentDelayDays: 0, // Would need payment data to calculate
      attendanceConsistency,
      averageCheckInTime: avgCheckIn,
      averageCheckOutTime: avgCheckIn + avgHours,
      locationVariance,
      weekendWorkRatio: 0, // Would need date analysis
      averagePaymentAmount: records.reduce((sum, r) => sum + r.amountEarned, 0) / records.length,
      paymentFrequency: records.length / 30, // per month
      paymentMethodVariance: 0,
      worksiteId: records[0]?.worksite?.name || '',
      worksiteType: records[0]?.workType || '',
      supervisorId: records[0]?.verifiedBy || '',
      workersPerSite: 0, // Would need site-level aggregation
      completionRate: 0,
      sharedBankAccounts: 0, // Would need cross-worker analysis
      sharedPhoneNumbers: 0,
      sharedAddresses: 0,
      seasonality: 0,
      registrationRecency: 0,
      isFraudulent: hasAnomalies,
      fraudType: anomalyTypes[0]
    };
  }

  /**
   * Get fraud statistics
   */
  async getStatistics(): Promise<{
    totalAlerts: number;
    bySeverity: Record<string, number>;
    byType: Record<string, number>;
    resolved: number;
    pending: number;
  }> {
    const alerts = await mongoService.find<FraudAlertDocument>(
      dbConfig.collections.fraudAlerts,
      {}
    );

    const data = alerts.data || [];

    const bySeverity: Record<string, number> = {
      low: 0, medium: 0, high: 0, critical: 0
    };
    const byType: Record<string, number> = {};
    let resolved = 0;
    let pending = 0;

    for (const alert of data) {
      bySeverity[alert.severity] = (bySeverity[alert.severity] || 0) + 1;
      byType[alert.alertType] = (byType[alert.alertType] || 0) + 1;
      
      if (['confirmed', 'action_taken', 'closed', 'false_positive'].includes(alert.status)) {
        resolved++;
      } else {
        pending++;
      }
    }

    return {
      totalAlerts: data.length,
      bySeverity,
      byType,
      resolved,
      pending
    };
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate distance between two coordinates in kilometers
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Export singleton
export const fraudDetectionService = new FraudDetectionService();
export default fraudDetectionService;
