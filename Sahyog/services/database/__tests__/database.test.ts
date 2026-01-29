/**
 * SAHAYOG Database Integration Tests
 * 
 * Run in browser console: window.runDatabaseTests()
 */

import { 
  mongoService, 
  dbConfig, 
  createDataCollector,
  fraudDetectionService
} from '../index';
import { 
  UserDocument, 
  GrievanceDocument, 
  WorkRecordDocument,
  PaymentDocument 
} from '../schemas';

export interface DBTestResult {
  name: string;
  passed: boolean;
  message: string;
  data?: any;
}

// ============================================
// TEST FUNCTIONS
// ============================================

async function testConnection(): Promise<DBTestResult> {
  try {
    const connected = await mongoService.connect();
    return {
      name: 'Database Connection',
      passed: connected,
      message: connected ? 'Database connected successfully' : 'Connection failed'
    };
  } catch (error: any) {
    return { name: 'Database Connection', passed: false, message: error.message };
  }
}

async function testUserCRUD(): Promise<DBTestResult> {
  try {
    // Create
    const testUser: Partial<UserDocument> = {
      name: 'Test User',
      phoneNumber: '9876543210',
      location: {
        state: 'Madhya Pradesh',
        district: 'Sehore',
        block: 'Sadar',
        village: 'Piparia'
      },
      onboardingLevel: 1,
      consents: []
    };
    
    const insertResult = await mongoService.insertOne(dbConfig.collections.users, testUser);
    if (!insertResult.success) throw new Error('Insert failed');
    
    const userId = insertResult.insertedId;
    
    // Read
    const findResult = await mongoService.findOne<UserDocument>(
      dbConfig.collections.users, 
      { _id: userId }
    );
    if (!findResult.data) throw new Error('Find failed');
    
    // Update
    const updateResult = await mongoService.updateOne(
      dbConfig.collections.users,
      { _id: userId },
      { daysWorked: 10 }
    );
    if (!updateResult.success) throw new Error('Update failed');
    
    // Verify update
    const verifyResult = await mongoService.findOne<UserDocument>(
      dbConfig.collections.users, 
      { _id: userId }
    );
    if (verifyResult.data?.daysWorked !== 10) throw new Error('Update verification failed');
    
    // Delete
    const deleteResult = await mongoService.deleteOne(
      dbConfig.collections.users,
      { _id: userId }
    );
    if (!deleteResult.success) throw new Error('Delete failed');
    
    return {
      name: 'User CRUD Operations',
      passed: true,
      message: 'All CRUD operations successful',
      data: { userId }
    };
  } catch (error: any) {
    return { name: 'User CRUD Operations', passed: false, message: error.message };
  }
}

async function testGrievanceFiling(): Promise<DBTestResult> {
  try {
    const grievance: Partial<GrievanceDocument> = {
      ticketNumber: `TEST-${Date.now()}`,
      category: 'payment_delay',
      description: 'Test grievance for database verification',
      status: 'registered',
      priority: 'normal',
      registeredAt: new Date().toISOString(),
      communications: []
    };
    
    const result = await mongoService.insertOne(dbConfig.collections.grievances, grievance);
    
    if (result.success) {
      // Clean up
      await mongoService.deleteOne(dbConfig.collections.grievances, { _id: result.insertedId });
    }
    
    return {
      name: 'Grievance Filing',
      passed: result.success,
      message: result.success ? 'Grievance saved successfully' : 'Failed to save grievance',
      data: { ticketNumber: grievance.ticketNumber }
    };
  } catch (error: any) {
    return { name: 'Grievance Filing', passed: false, message: error.message };
  }
}

async function testDataExtraction(): Promise<DBTestResult> {
  try {
    const sessionId = `test-session-${Date.now()}`;
    const collector = createDataCollector(sessionId);
    
    // Test extraction from Hindi text
    const testTexts = [
      'मेरा नाम रामलाल है',
      'मैं 45 साल का हूं',
      'मेरे परिवार में 5 लोग हैं'
    ];
    
    const extracted: any[] = [];
    for (const text of testTexts) {
      const items = collector.extractFromText(text);
      extracted.push(...items);
    }
    
    return {
      name: 'Data Extraction',
      passed: extracted.length >= 2,
      message: `Extracted ${extracted.length} data fields from conversation`,
      data: { extracted }
    };
  } catch (error: any) {
    return { name: 'Data Extraction', passed: false, message: error.message };
  }
}

async function testConsentFlow(): Promise<DBTestResult> {
  try {
    const sessionId = `test-consent-${Date.now()}`;
    const collector = createDataCollector(sessionId);
    
    // Extract data that requires consent
    collector.extractFromText('मेरा फोन नंबर 9876543210 है');
    
    // Check if consent prompt is generated
    const prompt = collector.getConsentPrompt();
    
    if (!prompt) {
      return {
        name: 'Consent Flow',
        passed: false,
        message: 'No consent prompt generated for sensitive data'
      };
    }
    
    // Process consent
    const result = await collector.processConsentResponse(true);
    
    return {
      name: 'Consent Flow',
      passed: result.success,
      message: 'Consent flow working correctly',
      data: { 
        promptGenerated: true,
        field: prompt.field.field,
        consentProcessed: result.success
      }
    };
  } catch (error: any) {
    return { name: 'Consent Flow', passed: false, message: error.message };
  }
}

async function testFraudDetection(): Promise<DBTestResult> {
  try {
    // Create a suspicious work record
    const workRecord: WorkRecordDocument = {
      workId: 'test-work-1',
      workType: 'road_construction',
      worksite: {
        name: 'Test Site',
        location: { lat: 23.5, lng: 77.5 },
        gramPanchayat: 'Test GP',
        block: 'Test Block',
        district: 'Test District'
      },
      userId: 'test-user',
      jobCardNumber: 'TEST-123',
      workerName: 'Test Worker',
      date: new Date().toISOString(),
      checkInTime: '06:00', // Unusually early
      checkOutTime: '22:00', // Very late
      hoursWorked: 16, // Excessive hours
      verificationMethod: 'none',
      wageRate: 250,
      amountEarned: 4000, // High for one day
      paymentStatus: 'pending'
    };
    
    const anomalies = await fraudDetectionService.analyzeWorkRecord(workRecord);
    
    return {
      name: 'Fraud Detection',
      passed: anomalies.length > 0,
      message: `Detected ${anomalies.length} anomalies in suspicious record`,
      data: { anomalies }
    };
  } catch (error: any) {
    return { name: 'Fraud Detection', passed: false, message: error.message };
  }
}

async function testAggregation(): Promise<DBTestResult> {
  try {
    // Insert test data
    const testUsers = [
      { name: 'User 1', daysWorked: 10, location: { state: 'MP', district: 'Sehore', block: 'A', village: 'V1' }, onboardingLevel: 1, consents: [] },
      { name: 'User 2', daysWorked: 20, location: { state: 'MP', district: 'Sehore', block: 'A', village: 'V2' }, onboardingLevel: 2, consents: [] },
      { name: 'User 3', daysWorked: 30, location: { state: 'MP', district: 'Bhopal', block: 'B', village: 'V3' }, onboardingLevel: 3, consents: [] }
    ];
    
    for (const user of testUsers) {
      await mongoService.insertOne(dbConfig.collections.users, user);
    }
    
    // Test aggregation
    const result = await mongoService.aggregate<UserDocument>(
      dbConfig.collections.users,
      [
        { $match: { daysWorked: { $gte: 15 } } },
        { $sort: { daysWorked: -1 } },
        { $limit: 2 }
      ]
    );
    
    // Clean up
    for (const user of testUsers) {
      await mongoService.deleteOne(dbConfig.collections.users, { name: user.name });
    }
    
    return {
      name: 'Aggregation Pipeline',
      passed: result.success && (result.data?.length || 0) >= 1,
      message: `Aggregation returned ${result.data?.length || 0} results`,
      data: { results: result.data }
    };
  } catch (error: any) {
    return { name: 'Aggregation Pipeline', passed: false, message: error.message };
  }
}

async function testDatabaseStats(): Promise<DBTestResult> {
  try {
    const stats = await mongoService.getStats();
    
    return {
      name: 'Database Stats',
      passed: true,
      message: 'Stats retrieved successfully',
      data: stats
    };
  } catch (error: any) {
    return { name: 'Database Stats', passed: false, message: error.message };
  }
}

// ============================================
// MAIN TEST RUNNER
// ============================================

export async function runAllDatabaseTests(): Promise<{
  totalTests: number;
  passed: number;
  failed: number;
  results: DBTestResult[];
}> {
  console.log('🧪 Starting SAHAYOG Database Tests...\n');
  
  const tests = [
    testConnection,
    testUserCRUD,
    testGrievanceFiling,
    testDataExtraction,
    testConsentFlow,
    testFraudDetection,
    testAggregation,
    testDatabaseStats
  ];
  
  const results: DBTestResult[] = [];
  
  for (const test of tests) {
    console.log(`Running: ${test.name}...`);
    const result = await test();
    results.push(result);
    console.log(`  ${result.passed ? '✅' : '❌'} ${result.message}`);
    if (result.data && !result.passed) {
      console.log('  Details:', result.data);
    }
  }
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Database Test Results: ${passed}/${results.length} passed`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log('='.repeat(50));
  
  return { totalTests: results.length, passed, failed, results };
}

// Export for browser console
if (typeof window !== 'undefined') {
  (window as any).runDatabaseTests = runAllDatabaseTests;
  (window as any).mongoService = mongoService;
  (window as any).dbConfig = dbConfig;
  (window as any).fraudDetectionService = fraudDetectionService;
  console.log('🗄️ Database Tests loaded! Run: window.runDatabaseTests()');
}

export default { runAllDatabaseTests };
