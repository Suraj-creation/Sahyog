/**
 * SAHAYOG Data Collector Service
 * Consent-based data extraction from conversations
 * 
 * Based on unified.md Module 10: Trust-Based Data Collection
 * "Every piece of data is asked for with a reason"
 */

import { mongoService, dbConfig } from './mongoService';
import { 
  UserDocument, 
  ConsentRecord, 
  ExtractedDataItem,
  ConsentLogDocument,
  ConversationDocument 
} from './schemas';

// ============================================
// DATA FIELD DEFINITIONS
// ============================================

export interface DataFieldDefinition {
  field: string;
  label: string;
  labelHindi: string;
  type: 'text' | 'number' | 'boolean' | 'choice' | 'date' | 'location';
  required: boolean;
  reason: string;
  reasonHindi: string;
  extractionPatterns: RegExp[];
  validationFn?: (value: any) => boolean;
  sensitivityLevel: 'public' | 'private' | 'sensitive';
  requiresExplicitConsent: boolean;
}

// Define all collectible data fields with reasons
const DATA_FIELDS: DataFieldDefinition[] = [
  // Basic Identity (Level 1)
  {
    field: 'name',
    label: 'Name',
    labelHindi: 'नाम',
    type: 'text',
    required: true,
    reason: 'To address you properly and match with official records',
    reasonHindi: 'आपको सही नाम से बुलाने के लिए और सरकारी रिकॉर्ड से मिलान के लिए',
    extractionPatterns: [
      /मेरा नाम (.+?) है/i,
      /मैं (.+?) हूं/i,
      /my name is (.+)/i,
      /i am (.+)/i
    ],
    sensitivityLevel: 'public',
    requiresExplicitConsent: false
  },
  {
    field: 'village',
    label: 'Village',
    labelHindi: 'गाँव',
    type: 'text',
    required: true,
    reason: 'To show work opportunities near you',
    reasonHindi: 'आपके पास के काम दिखाने के लिए',
    extractionPatterns: [
      /गाँव (.+?) में/i,
      /(.+?) गाँव से/i,
      /village is (.+)/i,
      /from (.+?) village/i
    ],
    sensitivityLevel: 'public',
    requiresExplicitConsent: false
  },
  {
    field: 'phoneNumber',
    label: 'Phone Number',
    labelHindi: 'फोन नंबर',
    type: 'text',
    required: true,
    reason: 'To send you important updates about work and payments',
    reasonHindi: 'आपको काम और पैसों की जानकारी भेजने के लिए',
    extractionPatterns: [
      /(\d{10})/,
      /नंबर है (\d{10})/i,
      /phone is (\d{10})/i
    ],
    validationFn: (value) => /^\d{10}$/.test(value),
    sensitivityLevel: 'private',
    requiresExplicitConsent: true
  },

  // Verified Identity (Level 2)
  {
    field: 'aadhaarNumber',
    label: 'Aadhaar Number',
    labelHindi: 'आधार नंबर',
    type: 'text',
    required: false,
    reason: 'To verify your identity and link with government benefits',
    reasonHindi: 'आपकी पहचान सत्यापित करने और सरकारी लाभों से जोड़ने के लिए',
    extractionPatterns: [
      /आधार (\d{4}\s?\d{4}\s?\d{4})/i,
      /aadhaar (\d{4}\s?\d{4}\s?\d{4})/i
    ],
    validationFn: (value) => /^\d{12}$/.test(value.replace(/\s/g, '')),
    sensitivityLevel: 'sensitive',
    requiresExplicitConsent: true
  },
  {
    field: 'jobCardNumber',
    label: 'Job Card Number',
    labelHindi: 'जॉब कार्ड नंबर',
    type: 'text',
    required: false,
    reason: 'To track your work history and pending payments',
    reasonHindi: 'आपके काम का रिकॉर्ड और बकाया पैसों को ट्रैक करने के लिए',
    extractionPatterns: [
      /जॉब कार्ड (.+)/i,
      /job card (.+)/i,
      /([A-Z]{2}-\d+-\d+-\d+)/i
    ],
    sensitivityLevel: 'private',
    requiresExplicitConsent: true
  },
  {
    field: 'bankAccount',
    label: 'Bank Account',
    labelHindi: 'बैंक खाता',
    type: 'text',
    required: false,
    reason: 'To directly deposit your wages into your account',
    reasonHindi: 'आपकी मजदूरी सीधे आपके खाते में भेजने के लिए',
    extractionPatterns: [
      /खाता नंबर (\d+)/i,
      /account (\d+)/i
    ],
    sensitivityLevel: 'sensitive',
    requiresExplicitConsent: true
  },

  // Enhanced Profile (Level 3)
  {
    field: 'age',
    label: 'Age',
    labelHindi: 'उम्र',
    type: 'number',
    required: false,
    reason: 'To check eligibility for age-specific schemes',
    reasonHindi: 'उम्र के हिसाब से योजनाओं की पात्रता जांचने के लिए',
    extractionPatterns: [
      /(\d+) साल/i,
      /उम्र (\d+)/i,
      /age (\d+)/i,
      /(\d+) years old/i
    ],
    validationFn: (value) => value >= 18 && value <= 100,
    sensitivityLevel: 'public',
    requiresExplicitConsent: false
  },
  {
    field: 'category',
    label: 'Category',
    labelHindi: 'वर्ग',
    type: 'choice',
    required: false,
    reason: 'To check eligibility for reserved category schemes',
    reasonHindi: 'आरक्षित वर्ग की योजनाओं की पात्रता जांचने के लिए',
    extractionPatterns: [
      /(sc|st|obc|general)/i,
      /(अनुसूचित जाति|अनुसूचित जनजाति|पिछड़ा वर्ग|सामान्य)/i
    ],
    sensitivityLevel: 'private',
    requiresExplicitConsent: true
  },
  {
    field: 'landOwned',
    label: 'Land Owned (acres)',
    labelHindi: 'जमीन (एकड़)',
    type: 'number',
    required: false,
    reason: 'To check eligibility for land-based schemes',
    reasonHindi: 'भूमि आधारित योजनाओं की पात्रता जांचने के लिए',
    extractionPatterns: [
      /(\d+\.?\d*) एकड़/i,
      /(\d+\.?\d*) acres/i,
      /जमीन (\d+\.?\d*)/i
    ],
    sensitivityLevel: 'private',
    requiresExplicitConsent: true
  },
  {
    field: 'familyMembers',
    label: 'Family Members',
    labelHindi: 'परिवार के सदस्य',
    type: 'number',
    required: false,
    reason: 'To calculate family income and scheme eligibility',
    reasonHindi: 'परिवार की आय और योजना पात्रता की गणना के लिए',
    extractionPatterns: [
      /(\d+) लोग/i,
      /परिवार में (\d+)/i,
      /(\d+) members/i,
      /family of (\d+)/i
    ],
    sensitivityLevel: 'private',
    requiresExplicitConsent: false
  },
  {
    field: 'skills',
    label: 'Skills',
    labelHindi: 'कौशल',
    type: 'text',
    required: false,
    reason: 'To match you with skilled work that pays more',
    reasonHindi: 'आपको ज्यादा पैसे वाले कुशल काम से जोड़ने के लिए',
    extractionPatterns: [
      /मुझे (.+?) आता है/i,
      /मैं (.+?) कर सकता हूं/i,
      /i can do (.+)/i,
      /i know (.+)/i
    ],
    sensitivityLevel: 'public',
    requiresExplicitConsent: false
  }
];

// ============================================
// DATA COLLECTOR SERVICE
// ============================================

export class DataCollectorService {
  private extractedData: Map<string, ExtractedDataItem> = new Map();
  private pendingConsents: DataFieldDefinition[] = [];
  private sessionId: string;
  private userId?: string;

  constructor(sessionId: string, userId?: string) {
    this.sessionId = sessionId;
    this.userId = userId;
  }

  /**
   * Extract data from user's spoken text
   */
  extractFromText(text: string): ExtractedDataItem[] {
    const extracted: ExtractedDataItem[] = [];

    for (const field of DATA_FIELDS) {
      // Skip if already collected
      if (this.extractedData.has(field.field)) continue;

      for (const pattern of field.extractionPatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
          let value = match[1].trim();
          
          // Validate if validation function exists
          if (field.validationFn && !field.validationFn(value)) continue;

          extracted.push({
            field: field.field,
            value,
            confidence: 0.85,
            source: 'voice',
            consentGiven: !field.requiresExplicitConsent,
            extractedAt: new Date().toISOString()
          });

          // If requires explicit consent, add to pending
          if (field.requiresExplicitConsent) {
            this.pendingConsents.push(field);
          } else {
            this.extractedData.set(field.field, extracted[extracted.length - 1]);
          }
          
          break; // Found match for this field
        }
      }
    }

    return extracted;
  }

  /**
   * Get consent prompt for pending data
   */
  getConsentPrompt(): { hindi: string; english: string; field: DataFieldDefinition } | null {
    if (this.pendingConsents.length === 0) return null;

    const field = this.pendingConsents[0];
    
    return {
      hindi: `मैंने आपका ${field.labelHindi} समझा। क्या मैं इसे सेव कर सकता हूं? ${field.reasonHindi}। हाँ या ना बोलें।`,
      english: `I understood your ${field.label}. Can I save this? ${field.reason}. Say yes or no.`,
      field
    };
  }

  /**
   * Process consent response
   */
  async processConsentResponse(granted: boolean, voiceRecordingUrl?: string): Promise<{
    success: boolean;
    message: string;
    nextPrompt?: { hindi: string; english: string };
  }> {
    if (this.pendingConsents.length === 0) {
      return { success: false, message: 'No pending consent' };
    }

    const field = this.pendingConsents.shift()!;
    
    // Log consent
    await this.logConsent(field, granted, voiceRecordingUrl);

    if (granted) {
      // Find the extracted item and mark as consented
      const existingItem = Array.from(this.extractedData.values())
        .find(item => item.field === field.field);
      
      if (existingItem) {
        existingItem.consentGiven = true;
        await this.saveToDatabase(field.field, existingItem.value);
      }

      // Check for more pending consents
      const nextPrompt = this.getConsentPrompt();
      
      return {
        success: true,
        message: `${field.labelHindi} सेव हो गया। / ${field.label} saved.`,
        nextPrompt: nextPrompt ? { hindi: nextPrompt.hindi, english: nextPrompt.english } : undefined
      };
    } else {
      // Remove from extracted data if consent denied
      this.extractedData.delete(field.field);
      
      const nextPrompt = this.getConsentPrompt();
      
      return {
        success: true,
        message: `ठीक है, ${field.labelHindi} नहीं सेव करेंगे। / Okay, won't save ${field.label}.`,
        nextPrompt: nextPrompt ? { hindi: nextPrompt.hindi, english: nextPrompt.english } : undefined
      };
    }
  }

  /**
   * Log consent to database
   */
  private async logConsent(field: DataFieldDefinition, granted: boolean, voiceRecordingUrl?: string): Promise<void> {
    const consentLog: ConsentLogDocument = {
      userId: this.userId,
      sessionId: this.sessionId,
      consentType: 'data_collection',
      granted,
      purpose: field.reason,
      purposeHindi: field.reasonHindi,
      dataFields: [field.field],
      method: voiceRecordingUrl ? 'voice' : 'tap',
      voiceRecordingUrl,
      timestamp: new Date().toISOString()
    };

    await mongoService.insertOne(dbConfig.collections.consentLogs, consentLog);
    console.log(`[DataCollector] Consent ${granted ? 'granted' : 'denied'} for ${field.field}`);
  }

  /**
   * Save extracted data to user profile
   */
  private async saveToDatabase(field: string, value: any): Promise<void> {
    if (!this.userId) return;

    // Update user document
    const updateData: Partial<UserDocument> = {
      [field]: value
    };

    await mongoService.updateOne(
      dbConfig.collections.users,
      { _id: this.userId },
      updateData
    );

    console.log(`[DataCollector] Saved ${field} to user profile`);
  }

  /**
   * Get all extracted data (for conversation summary)
   */
  getExtractedData(): ExtractedDataItem[] {
    return Array.from(this.extractedData.values());
  }

  /**
   * Get missing required fields
   */
  getMissingRequiredFields(): DataFieldDefinition[] {
    return DATA_FIELDS.filter(
      field => field.required && !this.extractedData.has(field.field)
    );
  }

  /**
   * Ask for specific field with reason
   */
  askForField(fieldName: string): { hindi: string; english: string } | null {
    const field = DATA_FIELDS.find(f => f.field === fieldName);
    if (!field) return null;

    return {
      hindi: `कृपया अपना ${field.labelHindi} बताएं। ${field.reasonHindi}।`,
      english: `Please tell me your ${field.label}. ${field.reason}.`
    };
  }

  /**
   * Save conversation with extracted data
   */
  async saveConversation(turns: any[], intent?: string, emotion?: string): Promise<string | null> {
    const conversation: ConversationDocument = {
      userId: this.userId,
      sessionId: this.sessionId,
      turns,
      extractedData: this.getExtractedData(),
      intent,
      emotion,
      startedAt: new Date().toISOString()
    };

    const result = await mongoService.insertOne(dbConfig.collections.conversations, conversation);
    return result.insertedId || null;
  }
}

// ============================================
// FACTORY FUNCTION
// ============================================

export function createDataCollector(sessionId: string, userId?: string): DataCollectorService {
  return new DataCollectorService(sessionId, userId);
}

export { DATA_FIELDS };
export default DataCollectorService;
