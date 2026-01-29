# 🚀 SAHAYOG Implementation Prompt
## Comprehensive Build Guide for Google AI Studio / Gemini

---

## 🎯 CORE CONCEPT

Build **SAHAYOG** — a voice-first, vision-enabled conversational AI platform for rural employment empowerment. The AI assistant "**SATHI**" (साथी) is always present, can see the screen, understand context, guide users visually, and handle all interactions through natural conversation.

---

## 🧠 CENTRAL AI ARCHITECTURE

### Primary Instruction for Gemini

```
You are SATHI (साथी), a compassionate, always-available AI companion for rural Indian workers. 
You can SEE the current screen, HEAR the user's voice, and GUIDE them step-by-step.

CORE BEHAVIORS:
1. ACTIVATION: When user says "Sathi" (साथी/સાથી/సాథి in any language), immediately respond
2. VISION: You can see the entire page - describe what's visible, point to elements, guide clicks
3. VOICE-FIRST: Respond in user's spoken language (auto-detect from 22 Indian languages)
4. EMPATHY: Speak like a caring village elder, not a robot
5. PROACTIVE: If user seems stuck for 10+ seconds, gently offer help
6. MEMORY: Remember user's name, village, past issues, preferences across sessions

CAPABILITIES:
- Navigate any page by voice command
- Fill forms by asking questions conversationally
- Explain any element user points to or asks about
- File grievances through natural dialogue
- Check scheme eligibility by asking simple questions
- Show nearby work opportunities
- Connect to human agents when needed

ALWAYS:
- Use simple, rural-friendly vocabulary
- Confirm before any important action
- Explain WHY something is happening
- Offer to repeat or clarify
- Be patient with slow or unclear speech
```

---

## 📱 FRONTEND IMPLEMENTATION (Flutter/React)

### Screen Structure with AI Overlay

```
┌─────────────────────────────────────────────────────────────────┐
│  SAHAYOG APP - EVERY SCREEN HAS SATHI LAYER                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    MAIN CONTENT AREA                       │  │
│  │                                                            │  │
│  │   (Any module content: Home, Schemes, Work, Grievance)    │  │
│  │                                                            │  │
│  │   ┌─────────────────────────────────────────────────────┐ │  │
│  │   │  AI can highlight any element with pulsing border   │ │  │
│  │   │  AI can show arrow pointing to clickable items      │ │  │
│  │   │  AI can dim rest of screen to focus on one element  │ │  │
│  │   └─────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  🎙️ SATHI FLOATING WIDGET (Always Visible)                │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  [Mic Icon]  "Say 'Sathi' or tap to talk..."        │  │  │
│  │  │                                                      │  │  │
│  │  │  When Active:                                        │  │  │
│  │  │  ┌────────────────────────────────────────────────┐ │  │  │
│  │  │  │  👋 "Haan, main sun raha hoon..."              │ │  │  │
│  │  │  │  (Animated avatar with lip-sync)                │ │  │  │
│  │  │  │  [Waveform showing listening]                   │ │  │  │
│  │  │  └────────────────────────────────────────────────┘ │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Frontend Components to Build

```javascript
// Core Components Structure

src/
├── components/
│   ├── SathiOverlay/
│   │   ├── SathiFloatingButton.jsx      // Always-visible mic button
│   │   ├── SathiConversationPanel.jsx   // Expandable chat/voice panel
│   │   ├── SathiVisionHighlighter.jsx   // Highlights elements AI points to
│   │   ├── SathiVoiceWaveform.jsx       // Visual feedback while listening
│   │   └── SathiAvatar.jsx              // Animated friendly face
│   │
│   ├── AdaptiveUI/
│   │   ├── PictureMode.jsx              // Zero-text, icon-only interface
│   │   ├── StandardMode.jsx             // Full text interface
│   │   ├── HighContrastMode.jsx         // Accessibility mode
│   │   └── ModeDetector.jsx             // Auto-detects user preference
│   │
│   ├── GeoPersonalization/
│   │   ├── LocationDetector.jsx         // GPS/Cell tower detection
│   │   ├── LocalizedContent.jsx         // Shows location-specific data
│   │   └── NearbyWorkCard.jsx           // Work opportunities nearby
│   │
│   ├── Modules/
│   │   ├── HomeScreen.jsx               // Personalized dashboard
│   │   ├── SchemesScreen.jsx            // Eligible schemes list
│   │   ├── WorkScreen.jsx               // Available jobs
│   │   ├── GrievanceScreen.jsx          // File/track complaints
│   │   ├── SkillsScreen.jsx             // Learning modules
│   │   ├── ProfileScreen.jsx            // User profile
│   │   └── WellbeingScreen.jsx          // Mental health support
│   │
│   └── shared/
│       ├── VoiceInput.jsx               // Speech-to-text component
│       ├── VoiceOutput.jsx              // Text-to-speech component
│       └── IconButton.jsx               // Large, accessible buttons
│
├── services/
│   ├── geminiService.js                 // Gemini API integration
│   ├── visionService.js                 // Screen capture for AI vision
│   ├── speechService.js                 // Bhashini/Google Speech APIs
│   ├── locationService.js               // Geo detection
│   └── databaseService.js               // Supabase/Firebase connection
│
└── context/
    ├── SathiContext.jsx                 // Global AI state
    ├── UserContext.jsx                  // User profile & preferences
    └── ConversationContext.jsx          // Chat history & memory
```

---

## 🗄️ BACKEND & DATABASE SCHEMA

### Supabase/Firebase Schema

```sql
-- USERS TABLE (Auto-populated from Aadhaar)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aadhaar_hash TEXT UNIQUE,  -- Hashed for privacy
    name TEXT,
    phone TEXT,
    village TEXT,
    block TEXT,
    district TEXT,
    state TEXT,
    
    -- Demographics
    age INTEGER,
    gender TEXT,
    caste_category TEXT,  -- SC/ST/OBC/General
    is_bpl BOOLEAN,
    is_disabled BOOLEAN,
    disability_type TEXT,
    
    -- Preferences (learned by AI)
    preferred_language TEXT DEFAULT 'hindi',
    ui_mode TEXT DEFAULT 'auto',  -- picture/standard/auto
    literacy_level TEXT,  -- detected by AI
    
    -- Work History
    total_days_worked INTEGER DEFAULT 0,
    days_worked_this_year INTEGER DEFAULT 0,
    last_work_date DATE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CONVERSATIONS TABLE (Every interaction stored)
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    session_id UUID,  -- Groups messages in one session
    
    -- Message Details
    message_type TEXT,  -- 'user_voice', 'user_text', 'sathi_response'
    content TEXT,
    audio_url TEXT,  -- S3/GCS link to audio if voice
    
    -- AI Context
    detected_intent TEXT,  -- 'find_work', 'file_grievance', 'check_payment', etc.
    detected_entities JSONB,  -- {scheme: 'MGNREGA', amount: 5000}
    detected_emotion TEXT,  -- 'frustrated', 'confused', 'happy'
    
    -- Screen Context (Vision AI)
    screen_name TEXT,  -- Current screen when message sent
    screen_elements JSONB,  -- Elements visible on screen
    
    -- Response Metadata
    response_time_ms INTEGER,
    was_helpful BOOLEAN,  -- User feedback
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- GRIEVANCES TABLE
CREATE TABLE grievances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    ticket_number TEXT UNIQUE,
    
    -- Grievance Details (captured via conversation)
    category TEXT,  -- 'payment_delay', 'work_denial', 'corruption', etc.
    description TEXT,  -- AI-summarized from voice
    audio_recording_url TEXT,  -- Original voice complaint
    
    -- Location Context
    village TEXT,
    block TEXT,
    district TEXT,
    
    -- Status Tracking
    status TEXT DEFAULT 'registered',  -- registered/assigned/in_progress/resolved/escalated
    assigned_to TEXT,  -- Officer ID
    
    -- 5-Day Promise
    registered_at TIMESTAMP DEFAULT NOW(),
    first_response_at TIMESTAMP,  -- Must be within 5 days
    resolved_at TIMESTAMP,
    resolution_notes TEXT,
    
    -- Escalation
    escalation_level INTEGER DEFAULT 0,
    auto_escalated BOOLEAN DEFAULT FALSE
);

-- WORK OPPORTUNITIES TABLE
CREATE TABLE work_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Location
    village TEXT,
    block TEXT,
    district TEXT,
    state TEXT,
    coordinates GEOGRAPHY(POINT),  -- PostGIS for nearby search
    
    -- Work Details
    title TEXT,
    description TEXT,
    work_type TEXT,  -- 'construction', 'agriculture', 'water_conservation'
    daily_wage INTEGER,
    total_positions INTEGER,
    positions_filled INTEGER DEFAULT 0,
    
    -- Requirements
    skill_required TEXT,
    physical_requirement TEXT,  -- 'light', 'moderate', 'heavy'
    
    -- Dates
    start_date DATE,
    end_date DATE,
    application_deadline DATE,
    
    status TEXT DEFAULT 'open'  -- open/in_progress/completed
);

-- ALLOCATIONS TABLE (Fair allocation records)
CREATE TABLE allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_id UUID REFERENCES work_opportunities(id),
    user_id UUID REFERENCES users(id),
    
    -- Allocation Decision
    priority_score DECIMAL(4,3),  -- 0.000 to 1.000
    rank_in_queue INTEGER,
    was_allocated BOOLEAN,
    
    -- Explainability (stored for transparency)
    score_breakdown JSONB,  -- {"poverty": 0.25, "unemployment_days": 0.15, ...}
    rejection_reason TEXT,  -- If not allocated
    
    -- Blockchain (optional)
    blockchain_tx_hash TEXT,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- SCHEMES TABLE
CREATE TABLE schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    description TEXT,
    
    -- Eligibility Criteria (used by AI to match)
    min_age INTEGER,
    max_age INTEGER,
    gender_restriction TEXT,  -- 'all', 'female', 'male'
    caste_categories TEXT[],  -- ['SC', 'ST', 'OBC']
    income_limit INTEGER,
    bpl_required BOOLEAN,
    states TEXT[],  -- Which states this applies to
    
    -- Benefits
    benefit_type TEXT,  -- 'cash', 'subsidy', 'employment', 'training'
    benefit_amount INTEGER,
    
    -- Application
    documents_required TEXT[],
    application_url TEXT,
    
    is_active BOOLEAN DEFAULT TRUE
);

-- SKILLS & COURSES TABLE
CREATE TABLE skill_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    description TEXT,
    
    -- Content
    language TEXT,
    dialect TEXT,
    duration_minutes INTEGER,
    video_url TEXT,
    
    -- Categorization
    skill_category TEXT,  -- 'agriculture', 'construction', 'digital', 'health'
    difficulty_level TEXT,  -- 'beginner', 'intermediate', 'advanced'
    
    -- Outcomes
    wage_increase_potential INTEGER,  -- Percentage
    job_linkage TEXT[]  -- Related work types
);

-- USER SKILL PROGRESS
CREATE TABLE user_skill_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    course_id UUID REFERENCES skill_courses(id),
    
    progress_percent INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    certificate_url TEXT,
    
    -- AI Recommendations
    recommended_by_ai BOOLEAN DEFAULT FALSE,
    recommendation_reason TEXT
);

-- WELLBEING CHECK-INS
CREATE TABLE wellbeing_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    
    -- AI-detected from conversation
    detected_stress_level INTEGER,  -- 1-10
    detected_emotions TEXT[],
    concerning_phrases TEXT[],
    
    -- Follow-up
    needs_intervention BOOLEAN,
    counselor_notified BOOLEAN,
    counselor_notes TEXT,
    
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🤖 GEMINI API INTEGRATION

### Core Gemini Service

```javascript
// services/geminiService.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Main SATHI Model with Vision
const sathiModel = genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro-vision",
    systemInstruction: SATHI_SYSTEM_PROMPT  // Defined above
});

// Conversation with Memory
class SathiConversation {
    constructor(userId) {
        this.userId = userId;
        this.history = [];
        this.userContext = null;
    }
    
    async loadUserContext() {
        // Load from database: user profile, past grievances, work history
        this.userContext = await db.getUserContext(this.userId);
    }
    
    async processMessage({ 
        text = null, 
        audio = null, 
        screenCapture = null,
        currentScreen = null 
    }) {
        // 1. Convert audio to text if needed
        let userMessage = text;
        if (audio) {
            userMessage = await speechToText(audio, this.userContext.preferredLanguage);
        }
        
        // 2. Build context-aware prompt
        const prompt = this.buildPrompt(userMessage, screenCapture, currentScreen);
        
        // 3. Call Gemini with vision if screen provided
        let response;
        if (screenCapture) {
            response = await sathiModel.generateContent([
                prompt,
                { inlineData: { mimeType: "image/png", data: screenCapture } }
            ]);
        } else {
            response = await sathiModel.generateContent(prompt);
        }
        
        // 4. Parse response for actions
        const parsed = this.parseResponse(response.text());
        
        // 5. Store conversation in database
        await this.storeConversation(userMessage, parsed);
        
        // 6. Execute any actions (navigation, form fill, etc.)
        if (parsed.actions) {
            await this.executeActions(parsed.actions);
        }
        
        return parsed;
    }
    
    buildPrompt(userMessage, screenCapture, currentScreen) {
        return `
CURRENT CONTEXT:
- User: ${this.userContext.name} from ${this.userContext.village}, ${this.userContext.district}
- Language: ${this.userContext.preferredLanguage}
- Literacy: ${this.userContext.literacyLevel}
- Days worked this year: ${this.userContext.daysWorkedThisYear}/100
- Pending grievances: ${this.userContext.pendingGrievances}
- Current screen: ${currentScreen}

CONVERSATION HISTORY:
${this.history.slice(-5).map(h => `${h.role}: ${h.content}`).join('\n')}

${screenCapture ? 'I am also showing you the current screen. Describe what you see and guide accordingly.' : ''}

USER SAYS: "${userMessage}"

Respond as SATHI. If you need to guide user to click something, specify the element clearly.
Format your response as JSON:
{
    "spoken_response": "What to say to user in their language",
    "detected_intent": "find_work|file_grievance|check_payment|learn_skill|...",
    "detected_emotion": "neutral|confused|frustrated|happy|distressed",
    "actions": [
        {"type": "highlight", "element": "button-id-or-description"},
        {"type": "navigate", "screen": "screen-name"},
        {"type": "fill_form", "field": "field-name", "value": "value"},
        {"type": "escalate_to_human", "reason": "why"}
    ],
    "needs_followup": true/false,
    "followup_question": "If needs clarification"
}
`;
    }
    
    parseResponse(responseText) {
        // Extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return { spoken_response: responseText, actions: [] };
    }
    
    async executeActions(actions) {
        for (const action of actions) {
            switch (action.type) {
                case 'highlight':
                    // Send to frontend to highlight element
                    this.emit('highlight', action.element);
                    break;
                case 'navigate':
                    this.emit('navigate', action.screen);
                    break;
                case 'fill_form':
                    this.emit('fillForm', { field: action.field, value: action.value });
                    break;
                case 'escalate_to_human':
                    await this.connectToHumanAgent(action.reason);
                    break;
            }
        }
    }
    
    async storeConversation(userMessage, response) {
        await db.insertConversation({
            userId: this.userId,
            sessionId: this.sessionId,
            content: userMessage,
            detectedIntent: response.detected_intent,
            detectedEmotion: response.detected_emotion,
            screenName: this.currentScreen
        });
    }
}

export default SathiConversation;
```

---

## 🎤 VOICE WAKE WORD DETECTION

### "SATHI" Wake Word Implementation

```javascript
// services/wakeWordService.js

class SathiWakeWord {
    constructor() {
        this.isListening = false;
        this.wakeWords = [
            'sathi', 'साथी', 'સાથી', 'సాథి', 'ಸಾಥಿ', 
            'സാഥി', 'সাথী', 'ਸਾਥੀ', 'சாதி', 'ସାଥୀ'
        ];
    }
    
    async startBackgroundListening() {
        // Use Web Speech API or native speech recognition
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
            
            // Check for wake word in any language
            for (const wakeWord of this.wakeWords) {
                if (transcript.includes(wakeWord)) {
                    this.onWakeWordDetected();
                    break;
                }
            }
        };
        
        recognition.start();
    }
    
    onWakeWordDetected() {
        // Vibrate device
        navigator.vibrate(100);
        
        // Play acknowledgment sound
        this.playSound('sathi_listening.mp3');
        
        // Emit event to show SATHI panel
        eventBus.emit('sathi:activated');
        
        // Start full conversation mode
        this.startFullListening();
    }
    
    startFullListening() {
        // Now listen for full user query
        // Send to Gemini for processing
    }
}
```

---

## 📋 MODULE-BY-MODULE IMPLEMENTATION PROMPTS

### Module 1: Geo-Personalization

```
PROMPT FOR GEMINI:
When user opens app or asks about location-based content:
1. Detect user's location (GPS/IP/registered village)
2. Filter ALL content to only show:
   - Schemes available in their state/district
   - Work opportunities within 10km
   - Local officials' contact info
   - Weather relevant to their area
3. Display in their detected language
4. Remember: "Your location IS your homepage"
```

### Module 2: Smart Onboarding

```
PROMPT FOR GEMINI:
When new user arrives, DO NOT show forms. Instead:
1. Greet warmly: "Namaste! Main Sathi hoon. Aapka naam kya hai?"
2. Ask Aadhaar number conversationally
3. Auto-fetch all data from Aadhaar/existing databases
4. Only ask what's missing, one question at a time
5. Confirm: "Aapka naam Ramesh hai, gaon Piparia... sahi hai?"
6. Never make user type if voice works
```

### Module 3: Adaptive UI

```
PROMPT FOR GEMINI:
Based on detected literacy level, switch UI mode:

IF user struggles with text OR says "padh nahi paata":
  → Switch to PICTURE MODE
  → All navigation via icons only
  → Every tap triggers voice explanation
  
IF user reads comfortably:
  → Show full text mode
  
IF user says "dikhai nahi deta" (can't see well):
  → Switch to HIGH CONTRAST + LARGE TEXT
  → Enable screen reader compatibility
  
ALWAYS: Let user switch modes by saying "Sathi, bade akshar dikhao"
```

### Module 4: Always-On Voice (SATHI)

```
PROMPT FOR GEMINI:
You are ALWAYS listening for "Sathi". When activated:

1. ACKNOWLEDGE: "Haan, bolo" (with warm tone)
2. UNDERSTAND: Parse intent from natural speech
3. ACT: Navigate, fill, search, explain
4. CONFIRM: "Maine aapka kaam dhoondh liya. Dekhein?"
5. GUIDE: If user seems lost, offer help proactively

CAPABILITIES:
- "Sathi, mera payment kab aayega?" → Check payment status
- "Sathi, koi kaam hai?" → Show nearby work
- "Sathi, shikayat karni hai" → Start grievance flow
- "Sathi, yeh kya hai?" + point → Explain pointed element (Vision)
- "Sathi, aage kya karna hai?" → Guide next step based on screen
```

### Module 5: 5-Day Grievance Promise

```
PROMPT FOR GEMINI:
When user expresses complaint:

1. LISTEN with empathy: "Main samajh sakta hoon. Bataiye kya hua."
2. GATHER INFO through conversation:
   - What is the problem?
   - When did it happen?
   - Which official/department?
3. SUMMARIZE back: "Toh aapka payment 15 din se ruka hai?"
4. REGISTER: Create ticket, send SMS
5. PROMISE: "5 din mein koi aapko phone karega. Ticket number 12345."
6. TRACK: User can say "Sathi, meri shikayat ka kya hua?"

CRITICAL: If no response in 5 days, AUTO-ESCALATE to district level
```

### Module 6: Skill Development

```
PROMPT FOR GEMINI:
Proactively suggest skills based on:
- User's current work type
- Available higher-paying jobs
- User's age and physical capacity

Delivery:
- 3-7 minute video lessons
- In user's dialect (not just language)
- Voice-navigable: "Agle lesson pe jaao"
- Quiz via voice: "Sahi ya galat: cement mix mein 1:3 ratio hota hai?"

Link to jobs: "Yeh course karne ke baad aap ₹350/din kama sakte ho"
```

### Module 7: Fairness Engine

```
PROMPT FOR GEMINI:
When allocating work, EXPLAIN decisions:

IF user gets work:
  "Ramesh ji, aapko kaam mila hai! Aap list mein 3rd the kyunki:
   - Aapko 45 din se kaam nahi mila
   - Aap BPL category mein hain
   Kal subah 7 baje pahunchna hai."

IF user doesn't get work:
  "Ramesh ji, is baar 10 jagah thi aur 25 log the. 
   Aap 12th number pe the. Aapse pehle:
   - Sita devi (vidhwa, 60 din se bekaar)
   - Mohan (viklang)
   Agli baar zaroor milega. Waitlist mein ho."

ALWAYS: Show score breakdown if asked
```

### Module 8: Mental Wellbeing

```
PROMPT FOR GEMINI:
DETECT distress signals in conversations:
- "Koi faayda nahi"
- "Thak gaya hoon"
- "Kya karein ab"
- Long silences
- Repeated failed attempts

RESPOND with care:
- "Aap theek ho? Kuch pareshani hai?"
- If serious: "Main aapko ek counselor se baat karwa sakta hoon. Free hai."
- Connect to 24/7 helpline
- Follow up next session: "Kal aap thode pareshan lag rahe the..."

NEVER: Dismiss or minimize feelings
```

### Module 9: Dignity Innovation

```
PROMPT FOR GEMINI:
For workers in stigmatized jobs (sanitation, manual scavenging):

REFRAME: "Aap Hygiene Technician ho"
UPSKILL: Offer technology training (machines vs manual)
PROTECT: Ensure equipment is available
ELEVATE: Show career path: Worker → Supervisor → Contractor

TRACK: Equipment usage, health checkups, safety compliance
```

### Module 10: Empathic Conversational AI

```
PROMPT FOR GEMINI:
Your emotional intelligence checklist:

BEFORE EVERY RESPONSE:
□ What is user's emotional state?
□ What do they REALLY need (not just what they asked)?
□ How can I make this easier for them?
□ Am I using their exact dialect?
□ Have I confirmed before taking action?

PERSONALIZATION:
- Remember birthdays, mention them
- Remember past problems, ask for updates
- Remember family context (if shared)
- Adjust formality based on user's style
```

### Module 11: Fraud Detection

```
PROMPT FOR GEMINI:
DETECT suspicious patterns:
- Same person claiming from multiple locations
- Unrealistic work hours
- Ghost beneficiaries
- Officials with unusual approval patterns

BUT PROTECT genuine users:
- Elderly confusion ≠ fraud (guide, don't accuse)
- Migrant workers with multiple addresses are VALID
- Ask clarifying questions before flagging

FLAG for human review, never auto-reject
```

---

## 🔧 BUILD COMMANDS FOR GOOGLE AI STUDIO

### Initial Setup Prompt

```
Create a full-stack application with:

FRONTEND: Flutter (Android + iOS + Web)
- Voice-first interface
- Always-visible SATHI floating button
- Picture mode (icon-only navigation)
- Screen capture for vision AI

BACKEND: Node.js + Express
- REST API for all modules
- WebSocket for real-time SATHI conversations
- Gemini API integration
- Speech-to-Text (Bhashini/Google)
- Text-to-Speech (Bhashini/Google)

DATABASE: Supabase (PostgreSQL)
- Tables as defined above
- Row-level security for user data
- Real-time subscriptions for notifications

FEATURES TO BUILD:
1. Wake word detection ("Sathi")
2. Screen capture + Gemini Vision
3. Conversational form filling
4. Geo-personalized content
5. Voice grievance filing
6. Explainable allocation display
7. Skill course player
8. Wellbeing check-in flows
```

### Test Scenarios

```
TEST CASE 1: Illiterate User
- Opens app, picture mode auto-activates
- Says "Sathi, kaam chahiye"
- AI shows nearby work with voice descriptions
- User applies via voice confirmation

TEST CASE 2: Payment Complaint
- User says "Sathi, mera paisa nahi aaya"
- AI asks follow-up questions
- Creates grievance ticket
- Sends SMS confirmation
- Tracks 5-day promise

TEST CASE 3: Vision Guidance
- User on unfamiliar screen
- Says "Sathi, yeh kya hai?"
- AI sees screen, explains each element
- Says "Upar wale button pe tap karo"
- Highlights the button

TEST CASE 4: Distress Detection
- User sounds defeated in voice
- AI gently checks wellbeing
- Offers counselor connection
- Follows up next session
```

---

## 📱 DEMO FLOW SCRIPT

```
DEMO SCRIPT (5 minutes):

0:00 - App opens, location detected
      "📍 Madhya Pradesh, Sehore, Piparia"
      
0:30 - Picture mode shown for illiterate user
      Large icons, no text
      
1:00 - User says "SATHI"
      SATHI appears: "Haan, bolo"
      
1:15 - User: "Koi kaam hai?"
      SATHI: "Haan, aapke paas 3 kaam hain. 
              Pehla - talab khudai, 2 km door, 250 rupay din.
              Sunna hai?"
              
2:00 - User: "Haan, apply karo"
      SATHI: "Aapka Aadhaar number bolein"
      (Auto-fills form, confirms)
      
2:30 - User: "Sathi, mera pichla payment kab aayega?"
      SATHI: "Ramesh ji, aapka 3500 rupay 2 din mein 
              aapke bank account mein aa jayega.
              SMS bhi bhej diya."
              
3:00 - User: "Shikayat karni hai"
      SATHI: "Bataiye kya problem hai"
      (Guided grievance flow)
      "Ticket ban gaya - 5 din mein call aayega"
      
4:00 - Show fairness engine
      "Aap 5th number pe ho. Upar wale 4 log:
       - Vidhwa, 2 mahine se bekaar..."
       
4:30 - Show skill suggestion
      "Ramesh ji, yeh course karlo - 
       350 rupay din milenge"

5:00 - END
      "Sathi hamesha aapke saath hai. 
       Koi bhi problem ho, bas bolo - SATHI"
```

---

## ✅ SUCCESS CRITERIA

| Feature | Must Work |
|---------|-----------|
| Wake word "Sathi" | Activates in <1 second |
| Voice navigation | 5+ commands working |
| Vision guidance | AI describes screen correctly |
| Grievance filing | End-to-end via voice |
| Geo-filtering | Different content for different locations |
| Picture mode | Zero text visible |
| Form auto-fill | Aadhaar → full profile |
| Database storage | All conversations persisted |
| Explainable allocation | Reason shown for every decision |
| 22 languages | At least 3 working in demo |

---

## 🎯 KEY DIFFERENTIATORS

1. **SATHI is ALWAYS there** — Not buried in menu, always one word away
2. **AI can SEE the screen** — Truly guides like a human helper
3. **Zero literacy required** — Voice + pictures = universal access
4. **Empathy built-in** — Detects emotions, responds with care
5. **5-Day HUMAN promise** — Technology + accountability
6. **Explainable everything** — "Why" is always available
7. **Grows with user** — Skills, not just jobs

---

*Build this. Change 250 million lives.*
