/**
 * SAATHI Conversational AI Test Suite
 * 
 * Run these tests to verify all components are working properly.
 * Open browser console (F12) and call: window.runSaathiTests()
 */

import { liveService, LiveService } from '../liveService';
import { saathiCore, SaathiCore, EmotionalState } from '../saathiCore';
import { UIMode } from '../../types';

export interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  duration: number;
  details?: any;
}

export interface TestSuiteResult {
  totalTests: number;
  passed: number;
  failed: number;
  results: TestResult[];
  totalDuration: number;
}

// ============================================
// TEST HELPERS
// ============================================

async function runTest(
  name: string, 
  testFn: () => Promise<{ success: boolean; message: string; details?: any }>
): Promise<TestResult> {
  const start = performance.now();
  try {
    const result = await testFn();
    return {
      name,
      passed: result.success,
      message: result.message,
      duration: performance.now() - start,
      details: result.details
    };
  } catch (error: any) {
    return {
      name,
      passed: false,
      message: `Exception: ${error.message}`,
      duration: performance.now() - start,
      details: { error }
    };
  }
}

// ============================================
// INDIVIDUAL TESTS
// ============================================

/**
 * Test 1: API Key Configuration
 */
async function testApiKeyConfiguration(): Promise<{ success: boolean; message: string; details?: any }> {
  const result = LiveService.testApiKey();
  return {
    success: result.success,
    message: result.message,
    details: { keyPreview: result.keyPreview }
  };
}

/**
 * Test 2: AudioContext Support
 */
async function testAudioContextSupport(): Promise<{ success: boolean; message: string; details?: any }> {
  const result = LiveService.testAudioContext();
  return {
    success: result.success,
    message: result.message
  };
}

/**
 * Test 3: Microphone Permission
 */
async function testMicrophonePermission(): Promise<{ success: boolean; message: string; details?: any }> {
  const result = await LiveService.testMicrophone();
  return {
    success: result.success,
    message: result.message
  };
}

/**
 * Test 4: SaathiCore Initialization
 */
async function testSaathiCoreInit(): Promise<{ success: boolean; message: string; details?: any }> {
  try {
    // Set a mock user with correct types
    saathiCore.setUser({
      id: 'test-user',
      name: 'Test User',
      village: 'Test Village',
      block: 'Test Block',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      preferredLanguage: 'hi-IN',
      uiMode: UIMode.STANDARD,
      daysWorked: 10,
      onboardingLevel: 3,
      aadhaarLinked: true,
      phoneNumber: '9876543210',
      isLiterate: true,
      bankAccountLinked: true,
      registeredSchemes: [],
      pendingPayments: 0,
      lastActiveDate: new Date().toISOString()
    });
    
    saathiCore.setCurrentScreen('home');
    
    return {
      success: true,
      message: 'SaathiCore initialized successfully',
      details: {
        hasUniversalAccess: !!saathiCore.universalAccess,
        hasNavigation: !!saathiCore.navigation,
        hasDataCollector: !!saathiCore.dataCollector,
        hasGrievanceAutomation: !!saathiCore.grievanceAutomation
      }
    };
  } catch (error: any) {
    return {
      success: false,
      message: `SaathiCore init failed: ${error.message}`
    };
  }
}

/**
 * Test 5: Intent Detection
 */
async function testIntentDetection(): Promise<{ success: boolean; message: string; details?: any }> {
  const testCases = [
    { input: 'मुझे काम चाहिए', expectedIntent: 'navigate' },
    { input: 'शिकायत दर्ज करनी है', expectedIntent: 'complaint' },
    { input: 'योजना के बारे में बताओ', expectedIntent: 'query' },
    { input: 'मैं बहुत परेशान हूं', expectedIntent: 'emotional_support' },
  ];
  
  const results: any[] = [];
  
  for (const testCase of testCases) {
    try {
      const response = await saathiCore.processUserInput(testCase.input);
      results.push({
        input: testCase.input,
        expectedIntent: testCase.expectedIntent,
        actualIntent: response.intent,
        passed: response.intent === testCase.expectedIntent
      });
    } catch (error: any) {
      results.push({
        input: testCase.input,
        error: error.message,
        passed: false
      });
    }
  }
  
  const passedCount = results.filter(r => r.passed).length;
  
  return {
    success: passedCount >= testCases.length * 0.75, // 75% pass rate
    message: `Intent detection: ${passedCount}/${testCases.length} passed`,
    details: { results }
  };
}

/**
 * Test 6: Emotional State Detection
 */
async function testEmotionalStateDetection(): Promise<{ success: boolean; message: string; details?: any }> {
  const testCases = [
    { input: 'मैं बहुत खुश हूं', expectedEmotion: 'happy' },
    { input: 'मुझे बहुत गुस्सा आ रहा है', expectedEmotion: 'frustrated' },
    { input: 'मुझे समझ नहीं आ रहा', expectedEmotion: 'confused' },
    { input: 'जल्दी करो ये बहुत जरूरी है', expectedEmotion: 'urgent' },
  ];
  
  const results: any[] = [];
  
  for (const testCase of testCases) {
    try {
      const response = await saathiCore.processUserInput(testCase.input);
      results.push({
        input: testCase.input,
        expectedEmotion: testCase.expectedEmotion,
        actualEmotion: response.emotion,
        passed: response.emotion === testCase.expectedEmotion
      });
    } catch (error: any) {
      results.push({
        input: testCase.input,
        error: error.message,
        passed: false
      });
    }
  }
  
  const passedCount = results.filter(r => r.passed).length;
  
  return {
    success: passedCount >= testCases.length * 0.5, // 50% pass rate (emotion is harder)
    message: `Emotion detection: ${passedCount}/${testCases.length} passed`,
    details: { results }
  };
}

/**
 * Test 7: Navigation Commands
 */
async function testNavigationCommands(): Promise<{ success: boolean; message: string; details?: any }> {
  const testCases = [
    { input: 'काम वाला पेज दिखाओ', expectedScreen: 'work' },
    { input: 'शिकायत पेज खोलो', expectedScreen: 'grievance' },
    { input: 'योजनाएं दिखाओ', expectedScreen: 'schemes' },
    { input: 'होम पर जाओ', expectedScreen: 'home' },
  ];
  
  const results: any[] = [];
  
  for (const testCase of testCases) {
    try {
      const response = await saathiCore.processUserInput(testCase.input);
      const navigateAction = response.actions.find(a => a.type === 'navigate');
      results.push({
        input: testCase.input,
        expectedScreen: testCase.expectedScreen,
        actualScreen: navigateAction?.payload?.screen,
        passed: navigateAction?.payload?.screen === testCase.expectedScreen
      });
    } catch (error: any) {
      results.push({
        input: testCase.input,
        error: error.message,
        passed: false
      });
    }
  }
  
  const passedCount = results.filter(r => r.passed).length;
  
  return {
    success: passedCount >= testCases.length * 0.75,
    message: `Navigation: ${passedCount}/${testCases.length} passed`,
    details: { results }
  };
}

/**
 * Test 8: Full Connection Test (without actually connecting)
 */
async function testFullConnectionPrerequisites(): Promise<{ success: boolean; message: string; details?: any }> {
  const result = await liveService.testConnection();
  return {
    success: result.success,
    message: result.message,
    details: { steps: result.details }
  };
}

// ============================================
// MAIN TEST RUNNER
// ============================================

export async function runAllTests(): Promise<TestSuiteResult> {
  console.log('🧪 Starting SAATHI Test Suite...\n');
  
  const tests: Array<{ name: string; fn: () => Promise<{ success: boolean; message: string; details?: any }> }> = [
    { name: '1. API Key Configuration', fn: testApiKeyConfiguration },
    { name: '2. AudioContext Support', fn: testAudioContextSupport },
    { name: '3. Microphone Permission', fn: testMicrophonePermission },
    { name: '4. SaathiCore Initialization', fn: testSaathiCoreInit },
    { name: '5. Intent Detection', fn: testIntentDetection },
    { name: '6. Emotional State Detection', fn: testEmotionalStateDetection },
    { name: '7. Navigation Commands', fn: testNavigationCommands },
    { name: '8. Full Connection Prerequisites', fn: testFullConnectionPrerequisites },
  ];
  
  const results: TestResult[] = [];
  const suiteStart = performance.now();
  
  for (const test of tests) {
    console.log(`Running: ${test.name}...`);
    const result = await runTest(test.name, test.fn);
    results.push(result);
    console.log(`  ${result.passed ? '✅' : '❌'} ${result.message} (${result.duration.toFixed(0)}ms)`);
    if (result.details && !result.passed) {
      console.log('  Details:', result.details);
    }
  }
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const totalDuration = performance.now() - suiteStart;
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${passed}/${results.length} passed`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   ⏱️ Duration: ${totalDuration.toFixed(0)}ms`);
  console.log('='.repeat(50));
  
  return {
    totalTests: results.length,
    passed,
    failed,
    results,
    totalDuration
  };
}

// Export for browser console access
if (typeof window !== 'undefined') {
  (window as any).runSaathiTests = runAllTests;
  (window as any).LiveService = LiveService;
  (window as any).saathiCore = saathiCore;
  console.log('🧪 SAATHI Tests loaded! Run: window.runSaathiTests()');
}

export default {
  runAllTests,
  testApiKeyConfiguration,
  testAudioContextSupport,
  testMicrophonePermission,
  testSaathiCoreInit,
  testIntentDetection,
  testEmotionalStateDetection,
  testNavigationCommands,
  testFullConnectionPrerequisites
};
