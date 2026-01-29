/**
 * SAHAYOG Database Schemas
 * Defines data structures for all collections
 * 
 * Based on unified.md:
 * - Module 2: Progressive Information Gathering (Level 0-3)
 * - Module 11: Fraud Detection data requirements
 */

// ============================================
// USER SCHEMA (Progressive Information Gathering)
// ============================================

export interface UserDocument {
  _id?: string;
  
  // Level 0: Anonymous (no data required)
  sessionId?: string;
  
  // Level 1: Basic Identity
  phoneNumber?: string;
  location?: {
    state: string;
    district: string;
    block: string;
    gramPanchayat?: string;
    village: string;
    coordinates?: { lat: number; lng: number };
  };
  preferredLanguage?: string;
  
  // Level 2: Verified Identity
  aadhaarNumber?: string; // Encrypted
  aadhaarVerified?: boolean;
  jobCardNumber?: string;
  name?: string;
  fatherOrHusbandName?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  age?: number;
  category?: 'SC' | 'ST' | 'OBC' | 'General';
  address?: string;
  bankAccount?: {
    accountNumber: string; // Encrypted
    ifsc: string;
    bankName: string;
    verified: boolean;
  };
  photo?: string; // URL or base64
  
  // Level 3: Enhanced Profile (collected progressively)
  isLiterate?: boolean;
  educationLevel?: 'none' | 'primary' | 'secondary' | 'higher';
  previousWork?: string[];
  skills?: string[];
  landOwned?: number; // in acres
  familyMembers?: number;
  isHouseholdHead?: boolean;
  hasDisability?: boolean;
  disabilityType?: string;
  healthConditions?: string[];
  
  // Onboarding & Access
  onboardingLevel: 0 | 1 | 2 | 3;
  uiMode: 'voice_picture' | 'simple_text' | 'full_feature' | 'high_contrast' | 'ivr_ussd';
  accessMethod: 'app' | 'app_offline' | 'ivr_ussd' | 'whatsapp' | 'csc_kiosk';
  
  // Scheme Eligibility & Enrollment
  registeredSchemes?: string[];
  eligibleSchemes?: string[];
  pendingApplications?: string[];
  
  // Work History
  daysWorked?: number;
  totalEarnings?: number;
  pendingPayments?: number;
  
  // Consent Management
  consents: ConsentRecord[];
  
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
  lastActiveAt?: string;
}

export interface ConsentRecord {
  type: 'data_collection' | 'voice_recording' | 'location_tracking' | 'scheme_application' | 'grievance_filing';
  granted: boolean;
  timestamp: string;
  method: 'voice' | 'tap' | 'agent_assisted' | 'otp';
  expiresAt?: string;
}

// ============================================
// CONVERSATION SCHEMA
// ============================================

export interface ConversationDocument {
  _id?: string;
  
  userId?: string;
  sessionId: string;
  
  // Conversation data
  turns: ConversationTurn[];
  
  // Extracted information
  extractedData: ExtractedDataItem[];
  
  // Analysis
  intent?: string;
  emotion?: string;
  satisfaction?: 'positive' | 'neutral' | 'negative';
  
  // Context
  currentScreen?: string;
  deviceInfo?: {
    type: 'smartphone' | 'feature_phone' | 'kiosk' | 'ivr';
    language: string;
  };
  
  // Timestamps
  startedAt: string;
  endedAt?: string;
  duration?: number; // in seconds
}

export interface ConversationTurn {
  id: string;
  speaker: 'user' | 'saathi';
  text: string;
  timestamp: string;
  audioUrl?: string;
  intent?: string;
  emotion?: string;
  confidence?: number;
}

export interface ExtractedDataItem {
  field: string;
  value: any;
  confidence: number;
  source: 'voice' | 'inferred' | 'database';
  consentGiven: boolean;
  extractedAt: string;
}

// ============================================
// GRIEVANCE SCHEMA
// ============================================

export interface GrievanceDocument {
  _id?: string;
  ticketNumber: string;
  
  // Complainant
  userId?: string;
  complainantName?: string;
  complainantPhone?: string;
  complainantVillage?: string;
  
  // Complaint Details
  category: GrievanceCategory;
  subCategory?: string;
  description: string;
  voiceRecordingUrl?: string;
  transcription?: string;
  
  // Status Tracking (5-Day Promise)
  status: 'registered' | 'investigating' | 'action_taken' | 'resolved' | 'escalated' | 'closed';
  priority: 'normal' | 'high' | 'urgent';
  
  // Timeline
  registeredAt: string;
  investigationStartedAt?: string;
  actionTakenAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  
  // 5-Day Promise Tracking
  daysSinceRegistration?: number;
  isOverdue?: boolean;
  escalationLevel?: 0 | 1 | 2 | 3; // 0=none, 1=block, 2=district, 3=state
  
  // Assignment
  assignedOfficer?: string;
  assignedOfficerPhone?: string;
  assignedAt?: string;
  
  // Resolution
  resolutionNotes?: string;
  actionTaken?: string;
  satisfactionRating?: 1 | 2 | 3 | 4 | 5;
  feedbackNotes?: string;
  
  // Communication Log
  communications: CommunicationLog[];
}

export type GrievanceCategory = 
  | 'payment_delay'
  | 'job_card_issue'
  | 'work_not_available'
  | 'wage_dispute'
  | 'worksite_facilities'
  | 'corruption'
  | 'scheme_application'
  | 'other';

export interface CommunicationLog {
  timestamp: string;
  type: 'call' | 'sms' | 'voice_message' | 'in_person';
  direction: 'incoming' | 'outgoing';
  summary: string;
  by: string;
}

// ============================================
// WORK RECORDS SCHEMA (For Fraud Detection)
// ============================================

export interface WorkRecordDocument {
  _id?: string;
  
  // Work Details
  workId: string;
  workType: string;
  worksite: {
    name: string;
    location: { lat: number; lng: number };
    gramPanchayat: string;
    block: string;
    district: string;
  };
  
  // Worker
  userId: string;
  jobCardNumber: string;
  workerName: string;
  
  // Attendance (Critical for fraud detection)
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  checkInLocation?: { lat: number; lng: number };
  checkOutLocation?: { lat: number; lng: number };
  hoursWorked?: number;
  
  // Verification
  verificationMethod: 'gps' | 'biometric' | 'supervisor' | 'photo' | 'none';
  verifiedBy?: string;
  verificationTimestamp?: string;
  
  // Payment
  wageRate: number;
  amountEarned: number;
  paymentStatus: 'pending' | 'processed' | 'paid' | 'disputed';
  paymentDate?: string;
  transactionId?: string;
  
  // Anomaly Flags (For ML/DL)
  anomalyFlags?: AnomalyFlag[];
  riskScore?: number; // 0-100
}

export interface AnomalyFlag {
  type: AnomalyType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export type AnomalyType = 
  | 'location_mismatch'      // Check-in location far from worksite
  | 'time_anomaly'           // Unusual check-in/out times
  | 'duplicate_attendance'   // Same person at multiple sites
  | 'phantom_worker'         // Worker doesn't exist
  | 'excessive_hours'        // More than possible hours
  | 'payment_mismatch'       // Payment doesn't match work
  | 'rapid_completion'       // Work completed too fast
  | 'bulk_registration'      // Many workers registered at once
  | 'supervisor_pattern'     // Same supervisor approving suspicious work
  | 'beneficiary_pattern';   // Unusual patterns in beneficiary data

// ============================================
// PAYMENT RECORDS SCHEMA (For Fraud Detection)
// ============================================

export interface PaymentDocument {
  _id?: string;
  
  // Transaction Details
  transactionId: string;
  type: 'wage' | 'scheme_benefit' | 'reimbursement';
  
  // Parties
  userId: string;
  recipientName: string;
  recipientAccount: string; // Encrypted
  
  // Amount
  amount: number;
  currency: 'INR';
  
  // Linked Records
  workRecordIds?: string[];
  schemeId?: string;
  
  // Status
  status: 'initiated' | 'processing' | 'completed' | 'failed' | 'reversed';
  initiatedAt: string;
  completedAt?: string;
  failureReason?: string;
  
  // Verification
  approvedBy?: string;
  approvalLevel?: number;
  
  // Fraud Detection
  riskScore?: number;
  flagged?: boolean;
  flagReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

// ============================================
// FRAUD ALERT SCHEMA (For ML/DL Integration)
// ============================================

export interface FraudAlertDocument {
  _id?: string;
  
  // Alert Details
  alertId: string;
  alertType: FraudAlertType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  // Detection
  detectedAt: string;
  detectedBy: 'ml_model' | 'rule_engine' | 'human_review' | 'community_report';
  modelVersion?: string;
  confidence?: number;
  
  // Entities Involved
  involvedUsers?: string[];
  involvedWorksites?: string[];
  involvedOfficials?: string[];
  involvedTransactions?: string[];
  
  // Evidence
  evidence: FraudEvidence[];
  
  // Geographic Scope
  affectedArea: {
    villages?: string[];
    gramPanchayats?: string[];
    blocks?: string[];
    districts?: string[];
    state: string;
  };
  
  // Financial Impact
  estimatedLoss?: number;
  recoveredAmount?: number;
  
  // Status
  status: 'detected' | 'investigating' | 'confirmed' | 'false_positive' | 'action_taken' | 'closed';
  assignedTo?: string;
  
  // Resolution
  actionTaken?: string;
  outcome?: string;
  closedAt?: string;
}

export type FraudAlertType = 
  | 'ghost_workers'           // Non-existent workers on payroll
  | 'duplicate_payments'      // Same work paid multiple times
  | 'inflated_attendance'     // Attendance higher than actual
  | 'fake_worksites'          // Work claimed but not done
  | 'embezzlement'            // Officials diverting funds
  | 'identity_fraud'          // Fake identities
  | 'collusion'               // Multiple parties colluding
  | 'material_theft'          // Construction materials stolen
  | 'wage_skimming';          // Partial wages given

export interface FraudEvidence {
  type: 'document' | 'photo' | 'audio' | 'gps_data' | 'transaction_log' | 'witness_statement';
  description: string;
  url?: string;
  data?: any;
  collectedAt: string;
  collectedBy: string;
}

// ============================================
// SKILL PROGRESS SCHEMA
// ============================================

export interface SkillProgressDocument {
  _id?: string;
  
  userId: string;
  
  // Course Progress
  courses: CourseProgress[];
  
  // Badges Earned
  badges: Badge[];
  
  // Overall Stats
  totalCoursesStarted: number;
  totalCoursesCompleted: number;
  totalVideosWatched: number;
  totalTimeSpent: number; // in minutes
  
  // Employment Outcomes
  jobsSecuredAfterTraining?: number;
  earningsIncrease?: number; // percentage
}

export interface CourseProgress {
  courseId: string;
  courseName: string;
  language: string;
  startedAt: string;
  completedAt?: string;
  progress: number; // 0-100
  currentModule: number;
  currentVideo: number;
  videosCompleted: string[];
  quizScores: { quizId: string; score: number; attemptedAt: string }[];
}

export interface Badge {
  badgeId: string;
  badgeName: string;
  badgeNameHindi: string;
  earnedAt: string;
  courseId: string;
}

// ============================================
// CONSENT LOG SCHEMA
// ============================================

export interface ConsentLogDocument {
  _id?: string;
  
  userId?: string;
  sessionId: string;
  
  // Consent Details
  consentType: 'data_collection' | 'voice_recording' | 'location' | 'biometric' | 'scheme_application';
  granted: boolean;
  
  // Context
  purpose: string;
  purposeHindi: string;
  dataFields: string[];
  
  // Collection Method
  method: 'voice' | 'tap' | 'agent_assisted' | 'otp';
  voiceRecordingUrl?: string;
  transcription?: string;
  
  // Legal
  timestamp: string;
  expiresAt?: string;
  withdrawnAt?: string;
  
  // Audit
  collectedBy?: string;
  ipAddress?: string;
  deviceId?: string;
}

// ============================================
// ML/DL DATA EXPORT INTERFACES
// ============================================

/**
 * Data structure optimized for fraud detection ML models
 */
export interface FraudDetectionFeatures {
  // Worker Features
  workerId: string;
  workerAge?: number;
  workerCategory?: string;
  daysWorkedTotal: number;
  averageHoursPerDay: number;
  paymentDelayDays: number;
  
  // Attendance Features
  attendanceConsistency: number; // 0-1
  averageCheckInTime: number; // hour of day
  averageCheckOutTime: number;
  locationVariance: number; // km variance from worksite
  weekendWorkRatio: number;
  
  // Payment Features
  averagePaymentAmount: number;
  paymentFrequency: number;
  paymentMethodVariance: number;
  
  // Worksite Features
  worksiteId: string;
  worksiteType: string;
  supervisorId: string;
  workersPerSite: number;
  completionRate: number;
  
  // Network Features
  sharedBankAccounts: number;
  sharedPhoneNumbers: number;
  sharedAddresses: number;
  
  // Temporal Features
  seasonality: number;
  registrationRecency: number; // days since registration
  
  // Labels (for supervised learning)
  isFraudulent?: boolean;
  fraudType?: string;
}

export default {
  UserDocument: {} as UserDocument,
  ConversationDocument: {} as ConversationDocument,
  GrievanceDocument: {} as GrievanceDocument,
  WorkRecordDocument: {} as WorkRecordDocument,
  PaymentDocument: {} as PaymentDocument,
  FraudAlertDocument: {} as FraudAlertDocument,
  SkillProgressDocument: {} as SkillProgressDocument,
  ConsentLogDocument: {} as ConsentLogDocument,
  FraudDetectionFeatures: {} as FraudDetectionFeatures
};
