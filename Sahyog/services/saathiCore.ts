/**
 * SAATHI CORE - The Heart of SAHAYOG
 * Implements the 4 Core Functionalities from unified.md Module 10
 * 
 * 1. UNIVERSAL ACCESS - Meets users where they are
 * 2. NAVIGATION GUIDANCE - Voice-driven navigation
 * 3. TRUST-BASED DATA COLLECTION - Conversational data gathering
 * 4. AUTOMATED GRIEVANCE FILING - Voice-to-complaint system
 */

import { UserProfile, GrievanceCategory, ActiveTab } from '../types';
import { 
  mongoService, 
  dbConfig, 
  createDataCollector, 
  DataCollectorService,
  ConversationDocument,
  GrievanceDocument,
  UserDocument
} from './database';

// ============================================
// TYPES FOR CONVERSATIONAL AI
// ============================================

export interface SaathiContext {
  currentScreen: ActiveTab;
  user: UserProfile | null;
  conversationHistory: ConversationTurn[];
  pendingDataFields: DataField[];
  activeGrievance: GrievanceContext | null;
  emotionalState: EmotionalState;
  sessionStartTime: Date;
  interactionCount: number;
  dataCollector?: DataCollectorService;
  sessionId: string;
}

export interface ConversationTurn {
  id: string;
  speaker: 'user' | 'saathi';
  text: string;
  timestamp: Date;
  intent?: SaathiIntent;
  emotion?: EmotionalState;
  action?: SaathiAction;
}

export interface DataField {
  field: string;
  label: string;
  labelHindi: string;
  type: 'text' | 'number' | 'boolean' | 'choice';
  required: boolean;
  reason: string;
  reasonHindi: string;
  collected: boolean;
  value?: any;
}

export interface GrievanceContext {
  category: GrievanceCategory | null;
  description: string;
  voiceRecordingUrl?: string;
  consentGiven: boolean;
  ticketNumber?: string;
  stage: 'category_selection' | 'description' | 'confirmation' | 'submitted';
}

export type EmotionalState = 
  | 'neutral' 
  | 'frustrated' 
  | 'confused' 
  | 'hopeful' 
  | 'distressed' 
  | 'happy' 
  | 'urgent'
  | 'empathetic'
  | 'encouraging';

export type SaathiIntent = 
  | 'navigate' 
  | 'query' 
  | 'complaint' 
  | 'apply' 
  | 'check_status' 
  | 'update_profile'
  | 'general_help'
  | 'emotional_support';

export interface SaathiAction {
  type: 'navigate' | 'highlight' | 'speak' | 'collect_data' | 'file_grievance' | 'show_status';
  payload: any;
}

export interface SaathiResponse {
  spokenText: string;
  spokenTextHindi: string;
  intent: SaathiIntent;
  emotion: EmotionalState;
  actions: SaathiAction[];
  suggestedReplies?: string[];
  shouldPause?: boolean;
}

// ============================================
// CORE FUNCTIONALITY 1: UNIVERSAL ACCESS
// ============================================

export class UniversalAccessEngine {
  private supportedLanguages = [
    { code: 'hi-IN', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'or-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  ];

  private dialects = [
    { code: 'bho', name: 'Bhojpuri', region: 'Bihar, UP' },
    { code: 'awa', name: 'Awadhi', region: 'UP' },
    { code: 'raj', name: 'Rajasthani', region: 'Rajasthan' },
    { code: 'chh', name: 'Chhattisgarhi', region: 'Chhattisgarh' },
    { code: 'har', name: 'Haryanvi', region: 'Haryana' },
    { code: 'bun', name: 'Bundelkhandi', region: 'MP, UP' },
  ];

  detectLanguageFromLocation(state: string, district: string): string {
    const stateLanguageMap: Record<string, string> = {
      'Madhya Pradesh': 'hi-IN',
      'Uttar Pradesh': 'hi-IN',
      'Bihar': 'hi-IN',
      'Maharashtra': 'mr-IN',
      'West Bengal': 'bn-IN',
      'Tamil Nadu': 'ta-IN',
      'Karnataka': 'kn-IN',
      'Gujarat': 'gu-IN',
      'Rajasthan': 'hi-IN',
      'Andhra Pradesh': 'te-IN',
      'Telangana': 'te-IN',
      'Kerala': 'ml-IN',
      'Odisha': 'or-IN',
      'Punjab': 'pa-IN',
    };
    return stateLanguageMap[state] || 'hi-IN';
  }

  detectDialect(state: string, district: string): string | null {
    // District-level dialect detection
    const dialectMap: Record<string, string> = {
      'Sehore': 'bun',
      'Varanasi': 'bho',
      'Lucknow': 'awa',
      'Jaipur': 'raj',
      'Raipur': 'chh',
      'Rohtak': 'har',
    };
    return dialectMap[district] || null;
  }

  getAccessMethod(deviceInfo: { hasInternet: boolean; hasSmartphone: boolean; hasFeaturePhone: boolean }): string {
    if (deviceInfo.hasSmartphone && deviceInfo.hasInternet) return 'app';
    if (deviceInfo.hasSmartphone) return 'app_offline';
    if (deviceInfo.hasFeaturePhone) return 'ivr_ussd';
    return 'csc_kiosk';
  }

  adaptSpeechRate(userAge?: number, isLiterate?: boolean): number {
    // Slower speech for elderly and illiterate users
    if (!isLiterate) return 0.8;
    if (userAge && userAge > 60) return 0.85;
    if (userAge && userAge > 50) return 0.9;
    return 1.0;
  }
}

// ============================================
// CORE FUNCTIONALITY 2: NAVIGATION GUIDANCE
// ============================================

export class NavigationGuide {
  private screenDescriptions: Record<ActiveTab, { hindi: string; english: string }> = {
    home: {
      hindi: 'यह आपका मुख्य पेज है। यहाँ से आप काम देख सकते हैं, योजनाओं की जानकारी ले सकते हैं, और शिकायत कर सकते हैं।',
      english: 'This is your home page. From here you can see work, learn about schemes, and file complaints.'
    },
    work: {
      hindi: 'यह काम का पेज है। यहाँ आपके गाँव के पास उपलब्ध सभी काम दिख रहे हैं।',
      english: 'This is the work page. Here you can see all available work near your village.'
    },
    schemes: {
      hindi: 'यह योजनाओं का पेज है। यहाँ आपके लिए उपलब्ध सभी सरकारी योजनाएं हैं।',
      english: 'This is the schemes page. Here are all government schemes available for you.'
    },
    grievance: {
      hindi: 'यह शिकायत पेज है। यहाँ से आप अपनी शिकायत दर्ज कर सकते हैं। 5 दिन में जवाब मिलेगा।',
      english: 'This is the grievance page. You can file your complaint here. Response guaranteed in 5 days.'
    },
    skills: {
      hindi: 'यह सीखने का पेज है। यहाँ आप नए हुनर सीख सकते हैं और ज्यादा पैसे कमा सकते हैं।',
      english: 'This is the learning page. Here you can learn new skills and earn more money.'
    },
    wellbeing: {
      hindi: 'यह मदद का पेज है। अगर आप किसी परेशानी में हैं तो यहाँ से मदद मिल सकती है।',
      english: 'This is the help page. If you are in any difficulty, you can get help here.'
    }
  };

  private navigationCommands: Record<string, ActiveTab> = {
    // Hindi commands
    'घर': 'home',
    'गृह': 'home',
    'होम': 'home',
    'मुख्य': 'home',
    'काम': 'work',
    'कार्य': 'work',
    'नौकरी': 'work',
    'रोजगार': 'work',
    'योजना': 'schemes',
    'योजनाएं': 'schemes',
    'स्कीम': 'schemes',
    'शिकायत': 'grievance',
    'समस्या': 'grievance',
    'परेशानी': 'grievance',
    'शिकायात': 'grievance',
    'रिपोर्ट': 'grievance',
    'सीखना': 'skills',
    'सीखें': 'skills',
    'पढ़ाई': 'skills',
    'ट्रेनिंग': 'skills',
    'मदद': 'wellbeing',
    'सहायता': 'wellbeing',
    'तबीयत': 'wellbeing',
    // English commands
    'home': 'home',
    'ghar': 'home',
    'work': 'work',
    'kaam': 'work',
    'job': 'work',
    'schemes': 'schemes',
    'yojana': 'schemes',
    'complaint': 'grievance',
    'shikayat': 'grievance',
    'problem': 'grievance',
    'learn': 'skills',
    'skills': 'skills',
    'seekhna': 'skills',
    'help': 'wellbeing',
    'madad': 'wellbeing',
  };

  parseNavigationIntent(text: string): ActiveTab | null {
    const lowerText = text.toLowerCase();
    for (const [keyword, screen] of Object.entries(this.navigationCommands)) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return screen;
      }
    }
    return null;
  }

  explainCurrentScreen(screen: ActiveTab, language: 'hi' | 'en' = 'hi'): string {
    const desc = this.screenDescriptions[screen];
    return language === 'hi' ? desc.hindi : desc.english;
  }

  getNavigationResponse(targetScreen: ActiveTab): SaathiResponse {
    const desc = this.screenDescriptions[targetScreen];
    return {
      spokenText: `Okay, I'm taking you to the ${targetScreen} page. ${desc.english}`,
      spokenTextHindi: `ठीक है, मैं आपको ${targetScreen} पेज पर ले जाता हूं। ${desc.hindi}`,
      intent: 'navigate',
      emotion: 'neutral',
      actions: [
        { type: 'navigate', payload: { screen: targetScreen } },
        { type: 'speak', payload: { text: desc.hindi } }
      ]
    };
  }
}

// ============================================
// CORE FUNCTIONALITY 3: TRUST-BASED DATA COLLECTION
// ============================================

export class TrustDataCollector {
  // Progressive data collection - only ask when needed
  private dataRequirements: Record<string, DataField[]> = {
    'basic': [
      {
        field: 'phoneNumber',
        label: 'Phone Number',
        labelHindi: 'फोन नंबर',
        type: 'text',
        required: true,
        reason: 'For personalized information and alerts',
        reasonHindi: 'आपके लिए जानकारी और अलर्ट भेजने के लिए',
        collected: false
      }
    ],
    'apply_scheme': [
      {
        field: 'aadhaarLinked',
        label: 'Aadhaar Number',
        labelHindi: 'आधार नंबर',
        type: 'text',
        required: true,
        reason: 'Required for scheme application',
        reasonHindi: 'योजना के आवेदन के लिए जरूरी है',
        collected: false
      },
      {
        field: 'bankAccountLinked',
        label: 'Bank Account',
        labelHindi: 'बैंक खाता',
        type: 'text',
        required: true,
        reason: 'For direct benefit transfer',
        reasonHindi: 'सीधे पैसे आने के लिए',
        collected: false
      }
    ],
    'widow_pension': [
      {
        field: 'maritalStatus',
        label: 'Marital Status',
        labelHindi: 'वैवाहिक स्थिति',
        type: 'choice',
        required: true,
        reason: 'Widow status qualifies for priority work allocation',
        reasonHindi: 'विधवा होने पर काम में प्राथमिकता मिलती है',
        collected: false
      }
    ]
  };

  // Collect data through natural conversation
  collectDataNaturally(field: DataField, context: SaathiContext): SaathiResponse {
    const prompt = this.generateDataPrompt(field, context);
    
    return {
      spokenText: prompt.english,
      spokenTextHindi: prompt.hindi,
      intent: 'update_profile',
      emotion: 'neutral',
      actions: [
        { type: 'collect_data', payload: { field: field.field, reason: field.reasonHindi } }
      ],
      suggestedReplies: ['हाँ', 'नहीं', 'बाद में बताऊंगा']
    };
  }

  private generateDataPrompt(field: DataField, context: SaathiContext): { hindi: string; english: string } {
    // Gentle, conversational prompts
    const prompts: Record<string, { hindi: string; english: string }> = {
      'maritalStatus': {
        hindi: `मैंने सुना कि आपने पति का ज़िक्र किया। ${field.reasonHindi}। क्या आप अपनी जानकारी अपडेट करना चाहेंगी?`,
        english: `I noticed you mentioned your husband. ${field.reason}. Would you like to update your information?`
      },
      'phoneNumber': {
        hindi: `आपका नंबर ${context.user?.phoneNumber} है? इससे हम आपको जरूरी जानकारी भेज सकते हैं।`,
        english: `Is your number ${context.user?.phoneNumber}? This helps us send you important updates.`
      },
      'aadhaarLinked': {
        hindi: `इस योजना के लिए आधार नंबर चाहिए। क्या आप अभी बताना चाहेंगे?`,
        english: `This scheme requires Aadhaar number. Would you like to provide it now?`
      }
    };

    return prompts[field.field] || {
      hindi: `${field.labelHindi} की जानकारी चाहिए। ${field.reasonHindi}।`,
      english: `We need ${field.label}. ${field.reason}.`
    };
  }

  recordConsentAndStore(field: string, value: any, voiceConsent: boolean): boolean {
    // In real implementation, this would:
    // 1. Record voice consent timestamp
    // 2. Encrypt and store data
    // 3. Update user's "golden record"
    console.log(`Storing ${field} with consent: ${voiceConsent}`);
    return true;
  }
}

// ============================================
// CORE FUNCTIONALITY 4: AUTOMATED GRIEVANCE FILING
// ============================================

export class GrievanceAutomation {
  private categoryKeywords: Record<string, GrievanceCategory> = {
    'पैसा नहीं आया': 'payment_delay',
    'पेमेंट नहीं': 'payment_delay',
    'भुगतान': 'payment_delay',
    'मजदूरी': 'wage_dispute',
    'जॉब कार्ड': 'job_card_issue',
    'काम नहीं मिला': 'work_not_available',
    'रोजगार नहीं': 'work_not_available',
    'भेदभाव': 'discrimination',
  };

  detectGrievanceCategory(text: string): GrievanceCategory | null {
    const lowerText = text.toLowerCase();
    for (const [keyword, category] of Object.entries(this.categoryKeywords)) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return category;
      }
    }
    return 'other';
  }

  async processGrievanceVoice(
    voiceText: string, 
    context: SaathiContext
  ): Promise<SaathiResponse> {
    const category = this.detectGrievanceCategory(voiceText);
    
    // Stage 1: Detect and confirm category
    if (!context.activeGrievance) {
      return {
        spokenText: `I understand you're facing a problem with ${category}. Let me help you file a complaint.`,
        spokenTextHindi: `मुझे दुख है कि आपको परेशानी हो रही है। मैं अभी आपकी शिकायत लिख रहा हूं। कृपया बताएं क्या समस्या है?`,
        intent: 'complaint',
        emotion: 'empathetic',
        actions: [
          { 
            type: 'file_grievance', 
            payload: { 
              stage: 'description',
              category,
              initialText: voiceText
            } 
          }
        ],
        suggestedReplies: ['हाँ, यही समस्या है', 'नहीं, कुछ और है']
      };
    }

    // Stage 2: Confirm complaint
    if (context.activeGrievance.stage === 'description') {
      const summary = this.generateComplaintSummary(voiceText, context);
      return {
        spokenText: `I have noted your complaint. Let me read it back to you: "${summary}". Is this correct?`,
        spokenTextHindi: `मैंने आपकी शिकायत लिख ली है। सुनिए: "${summary}"। क्या यह सही है?`,
        intent: 'complaint',
        emotion: 'neutral',
        actions: [
          { 
            type: 'file_grievance', 
            payload: { 
              stage: 'confirmation',
              summary
            } 
          }
        ],
        suggestedReplies: ['हाँ, सही है', 'नहीं, बदलना है', 'और जोड़ना है']
      };
    }

    // Stage 3: Submit with consent
    if (context.activeGrievance.stage === 'confirmation') {
      const ticketNo = `SAH-${Date.now().toString(36).toUpperCase()}`;
      
      // Save grievance to database
      this.saveGrievanceToDatabase(ticketNo, context);
      
      return {
        spokenText: `Your complaint has been registered. Ticket number is ${ticketNo}. You will receive a call within 5 days.`,
        spokenTextHindi: `आपकी शिकायत नंबर ${ticketNo} दर्ज हो गई। 5 दिनों के अंदर कोई आपको फोन करेगा। अगर 5 दिन में फोन नहीं आया तो मुझे बताना।`,
        intent: 'complaint',
        emotion: 'encouraging',
        actions: [
          { 
            type: 'file_grievance', 
            payload: { 
              stage: 'submitted',
              ticketNo
            } 
          },
          {
            type: 'speak',
            payload: { text: '5 दिन का वादा है। आपकी आवाज सुनी जाएगी।' }
          }
        ]
      };
    }

    return this.getDefaultResponse(context);
  }

  private async saveGrievanceToDatabase(ticketNo: string, context: SaathiContext): Promise<void> {
    try {
      const grievance: Partial<GrievanceDocument> = {
        ticketNumber: ticketNo,
        userId: context.user?.id,
        complainantName: context.user?.name,
        complainantPhone: context.user?.phoneNumber,
        complainantVillage: context.user?.village,
        category: context.activeGrievance?.category as GrievanceDocument['category'],
        description: context.activeGrievance?.description || '',
        voiceRecordingUrl: context.activeGrievance?.voiceRecordingUrl,
        status: 'registered',
        priority: 'normal',
        registeredAt: new Date().toISOString(),
        communications: []
      };

      await mongoService.insertOne(dbConfig.collections.grievances, grievance);
      console.log('[GrievanceAutomation] ✅ Grievance saved:', ticketNo);
    } catch (error) {
      console.error('[GrievanceAutomation] ❌ Failed to save grievance:', error);
    }
  }

  private generateComplaintSummary(text: string, context: SaathiContext): string {
    // In real implementation, use NLP to structure the complaint
    const user = context.user;
    const category = context.activeGrievance?.category;
    
    return `${user?.name} (गाँव ${user?.village}) की शिकायत: ${category} - ${text.slice(0, 100)}...`;
  }

  private getDefaultResponse(context: SaathiContext): SaathiResponse {
    return {
      spokenText: 'I am here to help. Please tell me what you need.',
      spokenTextHindi: 'मैं आपकी मदद के लिए हूं। बताइए क्या करना है?',
      intent: 'general_help',
      emotion: 'neutral',
      actions: []
    };
  }
}

// ============================================
// MAIN SAATHI CORE CLASS
// ============================================

export class SaathiCore {
  public universalAccess: UniversalAccessEngine;
  public navigation: NavigationGuide;
  public dataCollector: TrustDataCollector;
  public grievanceAutomation: GrievanceAutomation;
  public dbDataCollector: DataCollectorService | null = null;
  
  private context: SaathiContext;

  constructor() {
    this.universalAccess = new UniversalAccessEngine();
    this.navigation = new NavigationGuide();
    this.dataCollector = new TrustDataCollector();
    this.grievanceAutomation = new GrievanceAutomation();
    
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.context = {
      currentScreen: 'home',
      user: null,
      conversationHistory: [],
      pendingDataFields: [],
      activeGrievance: null,
      emotionalState: 'neutral',
      sessionStartTime: new Date(),
      interactionCount: 0,
      sessionId
    };

    // Initialize database data collector
    this.dbDataCollector = createDataCollector(sessionId);
    
    console.log('[SaathiCore] 🚀 Initialized with session:', sessionId);
  }

  setUser(user: UserProfile): void {
    this.context.user = user;
    
    // Update data collector with user ID
    if (user.id && this.dbDataCollector) {
      this.dbDataCollector = createDataCollector(this.context.sessionId, user.id);
    }
    
    // Save/update user in database
    this.saveUserToDatabase(user);
  }

  private async saveUserToDatabase(user: UserProfile): Promise<void> {
    try {
      const existingUser = await mongoService.findOne<UserDocument>(
        dbConfig.collections.users,
        { id: user.id }
      );

      const userData: Partial<UserDocument> = {
        name: user.name,
        location: {
          state: user.state,
          district: user.district,
          block: user.block || '',
          village: user.village
        },
        preferredLanguage: user.preferredLanguage,
        phoneNumber: user.phoneNumber,
        jobCardNumber: user.jobCardNumber,
        category: user.category,
        gender: user.gender,
        age: user.age,
        isLiterate: user.isLiterate,
        daysWorked: user.daysWorked,
        onboardingLevel: user.onboardingLevel as 0 | 1 | 2 | 3,
        consents: [],
        lastActiveAt: new Date().toISOString()
      };

      if (existingUser.data) {
        await mongoService.updateOne(
          dbConfig.collections.users,
          { id: user.id },
          userData
        );
        console.log('[SaathiCore] 📝 User profile updated in database');
      } else {
        await mongoService.insertOne(dbConfig.collections.users, {
          id: user.id,
          ...userData
        });
        console.log('[SaathiCore] ✅ New user saved to database');
      }
    } catch (error) {
      console.error('[SaathiCore] ❌ Failed to save user:', error);
    }
  }

  setCurrentScreen(screen: ActiveTab): void {
    this.context.currentScreen = screen;
  }

  async processUserInput(text: string): Promise<SaathiResponse> {
    this.context.interactionCount++;
    
    // Add to conversation history
    this.context.conversationHistory.push({
      id: `turn-${Date.now()}`,
      speaker: 'user',
      text,
      timestamp: new Date()
    });

    // Extract data from user input (consent-based)
    if (this.dbDataCollector) {
      const extracted = this.dbDataCollector.extractFromText(text);
      if (extracted.length > 0) {
        console.log('[SaathiCore] 📊 Extracted data:', extracted.map(e => e.field));
        
        // Check if consent prompt is needed
        const consentPrompt = this.dbDataCollector.getConsentPrompt();
        if (consentPrompt) {
          // Store pending consent for next turn
          this.context.pendingDataFields.push({
            field: consentPrompt.field.field,
            label: consentPrompt.field.label,
            labelHindi: consentPrompt.field.labelHindi,
            type: consentPrompt.field.type as 'text' | 'number' | 'boolean' | 'choice',
            required: consentPrompt.field.required,
            reason: consentPrompt.field.reason,
            reasonHindi: consentPrompt.field.reasonHindi,
            collected: false
          });
        }
      }
    }

    // Detect emotional state from text
    this.context.emotionalState = this.detectEmotion(text);

    // Check for emotional support need first (high priority)
    if (this.isEmotionalSupportNeeded(text)) {
      return this.getEmotionalSupportResponse(text);
    }

    // Check for grievance intent BEFORE navigation (filing complaints takes priority)
    if (this.isGrievanceIntent(text)) {
      return this.grievanceAutomation.processGrievanceVoice(text, this.context);
    }

    // Check for query/information request BEFORE navigation
    if (this.isQueryIntent(text)) {
      return this.getQueryResponse(text);
    }

    // Check for navigation intent (explicit navigation verbs required)
    if (this.hasNavigationVerb(text)) {
      const navIntent = this.navigation.parseNavigationIntent(text);
      if (navIntent) {
        return this.navigation.getNavigationResponse(navIntent);
      }
    }

    // Check for work/job seeking intent (also navigation)
    if (this.isWorkSeekingIntent(text)) {
      return {
        spokenText: 'Let me show you available work near your village.',
        spokenTextHindi: 'आपके गाँव के पास उपलब्ध काम दिखाता हूं।',
        intent: 'navigate',
        emotion: 'encouraging',
        actions: [{ type: 'navigate', payload: { screen: 'work' } }],
        suggestedReplies: ['हाँ दिखाओ', 'आज का काम', 'पास में काम']
      };
    }

    // Fallback: Check navigation without verb for simple screen names
    const navIntent = this.navigation.parseNavigationIntent(text);
    if (navIntent && this.isSimpleScreenRequest(text)) {
      return this.navigation.getNavigationResponse(navIntent);
    }

    // Check for help/explanation request
    if (this.isHelpRequest(text)) {
      return this.getHelpResponse();
    }

    // Default conversational response
    return this.getContextualResponse(text);
  }

  // Check if text has explicit navigation verbs
  private hasNavigationVerb(text: string): boolean {
    const navVerbs = ['जाओ', 'चलो', 'दिखाओ', 'खोलो', 'ले जाओ', 'जाना है', 'open', 'go to', 'take me', 'show me', 'navigate'];
    return navVerbs.some(verb => text.toLowerCase().includes(verb.toLowerCase()));
  }

  // Check if it's a simple screen name request (just the screen name with no other context)
  private isSimpleScreenRequest(text: string): boolean {
    const simpleWords = text.trim().split(/\s+/);
    return simpleWords.length <= 2;
  }

  private isEmotionalSupportNeeded(text: string): boolean {
    // More specific patterns for emotional support (not just complaint)
    const keywords = ['परेशान हूं', 'बहुत परेशान', 'दुखी हूं', 'तनाव', 'मुश्किल में', 'अकेला', 'डर लगता', 'चिंता हो रही', 
                      'stressed', 'sad', 'worried', 'alone', 'scared', 'depressed', 'anxious'];
    return keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
  }

  private getEmotionalSupportResponse(text: string): SaathiResponse {
    return {
      spokenText: 'I understand you are going through a difficult time. I am here to help you. Please tell me more.',
      spokenTextHindi: 'मैं समझ सकता हूं आप मुश्किल में हैं। मैं आपकी मदद के लिए हूं। बताइए क्या हुआ?',
      intent: 'emotional_support',
      emotion: 'empathetic',
      actions: [
        { type: 'speak', payload: { text: 'आप अकेले नहीं हैं, हम साथ हैं।' } }
      ],
      suggestedReplies: ['मदद चाहिए', 'किसी से बात करनी है', 'ठीक हूं अभी']
    };
  }

  private isWorkSeekingIntent(text: string): boolean {
    const keywords = ['काम चाहिए', 'काम दो', 'काम दिखाओ', 'रोजगार', 'नौकरी', 'मजदूरी',
                      'job', 'work', 'employment', 'want job', 'need work'];
    return keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
  }

  private isQueryIntent(text: string): boolean {
    const keywords = ['के बारे में', 'जानकारी', 'बताओ', 'क्या है', 'कैसे', 'पात्रता',
                      'about', 'information', 'tell me', 'what is', 'how to', 'eligibility'];
    return keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
  }

  private getQueryResponse(text: string): SaathiResponse {
    // Detect what they're asking about
    if (text.includes('योजना') || text.includes('scheme')) {
      return {
        spokenText: 'Let me tell you about government schemes available for you.',
        spokenTextHindi: 'आपके लिए उपलब्ध सरकारी योजनाओं के बारे में बताता हूं।',
        intent: 'query',
        emotion: 'neutral',
        actions: [{ type: 'navigate', payload: { screen: 'schemes' } }],
        suggestedReplies: ['पेंशन योजना', 'आवास योजना', 'सभी योजनाएं']
      };
    }
    
    return {
      spokenText: 'I can help you with information. What would you like to know?',
      spokenTextHindi: 'मैं जानकारी दे सकता हूं। क्या जानना चाहते हैं?',
      intent: 'query',
      emotion: 'neutral',
      actions: [],
      suggestedReplies: ['योजनाएं', 'काम', 'शिकायत']
    };
  }

  private detectEmotion(text: string): EmotionalState {
    const lowerText = text.toLowerCase();
    
    // Happy/positive
    if (lowerText.includes('खुश') || lowerText.includes('अच्छा') || lowerText.includes('धन्यवाद') || 
        lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('thanks')) {
      return 'happy';
    }
    
    // Frustrated/angry
    if (lowerText.includes('गुस्सा') || lowerText.includes('नाराज') || lowerText.includes('परेशान') || 
        lowerText.includes('frustrated') || lowerText.includes('angry')) {
      return 'frustrated';
    }
    
    // Confused
    if (lowerText.includes('समझ नहीं') || lowerText.includes('पता नहीं') || lowerText.includes('confused') ||
        lowerText.includes('कैसे करूं')) {
      return 'confused';
    }
    
    // Urgent
    if (lowerText.includes('तुरंत') || lowerText.includes('जल्दी') || lowerText.includes('urgent') ||
        lowerText.includes('जरूरी') || lowerText.includes('immediately')) {
      return 'urgent';
    }
    
    // Distressed
    if (lowerText.includes('दुखी') || lowerText.includes('मुश्किल') || lowerText.includes('तकलीफ') ||
        lowerText.includes('distressed') || lowerText.includes('sad')) {
      return 'distressed';
    }
    
    // Hopeful
    if (lowerText.includes('उम्मीद') || lowerText.includes('hope') || lowerText.includes('शायद')) {
      return 'hopeful';
    }
    
    return 'neutral';
  }

  private isGrievanceIntent(text: string): boolean {
    const keywords = ['शिकायत', 'दर्ज', 'समस्या', 'परेशानी', 'पैसा नहीं', 'काम नहीं', 'complaint', 'problem', 'report', 'issue'];
    return keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
  }

  private isHelpRequest(text: string): boolean {
    const keywords = ['मदद', 'help', 'क्या है', 'कैसे', 'बताओ', 'explain', 'what is'];
    return keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
  }

  private getHelpResponse(): SaathiResponse {
    const screenExplanation = this.navigation.explainCurrentScreen(this.context.currentScreen, 'hi');
    return {
      spokenText: `This is the ${this.context.currentScreen} page. ${screenExplanation}`,
      spokenTextHindi: screenExplanation,
      intent: 'general_help',
      emotion: 'neutral',
      actions: [
        { type: 'speak', payload: { text: screenExplanation } }
      ],
      suggestedReplies: ['और बताओ', 'दूसरा पेज दिखाओ', 'ठीक है, समझ गया']
    };
  }

  private getContextualResponse(text: string): SaathiResponse {
    // Context-aware response based on current screen
    const screenResponses: Record<ActiveTab, { hindi: string; english: string }> = {
      home: {
        hindi: 'आप घर पेज पर हैं। काम देखना है, योजना जाननी है, या कुछ और?',
        english: 'You are on home page. Want to see work, learn about schemes, or something else?'
      },
      work: {
        hindi: 'यहाँ आपके पास के काम दिख रहे हैं। किसी काम के बारे में जानना है?',
        english: 'Here are jobs near you. Want to know about any specific job?'
      },
      schemes: {
        hindi: 'यहाँ आपके लिए योजनाएं हैं। किसी योजना के बारे में बताऊं?',
        english: 'Here are schemes for you. Want me to explain any scheme?'
      },
      grievance: {
        hindi: 'यहाँ से शिकायत कर सकते हैं। बस बोलिए क्या परेशानी है।',
        english: 'You can file a complaint here. Just tell me what the problem is.'
      },
      skills: {
        hindi: 'यहाँ सीखने के कोर्स हैं। क्या सीखना चाहेंगे?',
        english: 'Here are learning courses. What would you like to learn?'
      },
      wellbeing: {
        hindi: 'मैं आपकी मदद के लिए हूं। बताइए क्या परेशानी है?',
        english: 'I am here to help. Tell me what is troubling you?'
      }
    };

    const response = screenResponses[this.context.currentScreen];
    return {
      spokenText: response.english,
      spokenTextHindi: response.hindi,
      intent: 'general_help',
      emotion: this.context.emotionalState,
      actions: [],
      suggestedReplies: ['काम दिखाओ', 'योजना बताओ', 'शिकायत करनी है', 'कुछ और']
    };
  }

  // Empathetic responses based on emotional state
  getEmpatheticPrefix(emotion: EmotionalState): string {
    const prefixes: Record<EmotionalState, string> = {
      neutral: '',
      frustrated: 'मैं समझ सकता हूं कि यह कितना मुश्किल है। ',
      confused: 'कोई बात नहीं, मैं आसान भाषा में समझाता हूं। ',
      hopeful: 'बहुत अच्छा! ',
      distressed: 'मुझे दुख है कि आप परेशान हैं। हम मिलकर इसका हल निकालेंगे। ',
      happy: 'बहुत खुशी हुई! ',
      urgent: 'मैं तुरंत मदद करता हूं। ',
      empathetic: 'मैं आपकी परेशानी समझता हूं। ',
      encouraging: 'आप बहुत अच्छा कर रहे हैं! '
    };
    return prefixes[emotion] || '';
  }
}

// Singleton instance
export const saathiCore = new SaathiCore();
