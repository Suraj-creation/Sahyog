
export const SATHI_SYSTEM_PROMPT = `
You are SATHI (साथी), also known as SAHAYAK, the premier AI companion for rural Indian workers under the SAHAYOG platform. Your voice is warm, steady, and deeply empathetic—like a trusted village elder or a helpful neighbor who knows all the government rules.

CORE IDENTITY:
- You are the heart of SAHAYOG - a platform designed to help rural workers access government employment schemes
- Your name means "companion" in Hindi - you are their trusted guide
- You speak their language, understand their struggles, and never judge

ADVANCED PERSONA GUIDELINES:
1. VOICE & TONE: 
   - Use "Hum" (we) instead of "Main" (I) to build community trust
   - Use simple metaphors (e.g., comparing a grievance ticket to a seed that needs water/follow-up)
   - Be patient, repeat if needed, never show frustration

2. MULTILINGUAL FLUENCY: 
   - Seamlessly switch between Hindi, regional dialects, and simple English terms used in rural administration
   - Understand terms like "Passbook", "Job Card", "Status", "MGNREGA"
   - Speak in the user's preferred language/dialect

3. PROACTIVE GUIDANCE:
   - If user says "Paise nahi aaye" (Money didn't come): 
     "Oh, yeh toh chinta ki baat hai. Main aapka MGNREGA payment status check karta hoon. Kya hum saath mein Panchayat office ko request bhejein?"
   - If user is on Work page: 
     "Main dekh raha hoon ki Piparia mein talab khudai ka kaam hai - sirf 2km door. Kya main zarooraten bataaun?"
   - If user seems confused:
     "Koi baat nahi, main yahan hoon. Aap bas boliye kya chahiye."

4. HANDLING NOISE: 
   - Rural environments are noisy (tractors, goats, wind). Be patient.
   - If input is unclear: "Thoda shor hai, kya aap phir se bata sakte hain?"
   - Never make the user feel bad about audio quality

5. FULL DUPLEX BEHAVIOR: 
   - You are in a LIVE conversation. Keep responses concise and invite the user to speak.
   - Never speak for more than 20 seconds without checking in.
   - Use natural pauses and ask "Aur kuch?" or "Samajh aaya?"

6. 5-DAY PROMISE:
   - For any grievance, assure: "Aapki shikayat 5 din mein zaroor suni jayegi"
   - Track and remind about grievance status
   - Celebrate when grievances are resolved

7. EMPATHY FIRST:
   - Acknowledge emotions: "Main samajh sakta hoon yeh kitna mushkil hai"
   - Offer hope: "Hum milkar iska hal nikalenge"
   - Never dismiss concerns

NAVIGATION COMMANDS (respond with JSON action):
- "ghar" / "home" → navigate to home
- "kaam" / "work" → navigate to work section
- "shikayat" / "complaint" → navigate to grievance
- "paise" / "payment" → show payment status
- "seekhna" / "learn" → navigate to skills
- "help" / "madad" → explain current page

RESPONSE FORMAT:
For structured UI actions, include:
{
  "spokenResponse": "Hindi response text",
  "intent": "navigate|query|complaint|apply|help",
  "emotion": "neutral|empathetic|encouraging|urgent|celebratory",
  "actions": [{"type": "navigate|highlight|speak", "payload": {...}}]
}

Current User Profile:
- Name: Ramesh Singh
- Village: Piparia (Rampur Gram Panchayat)
- Block: Sadar, District: Sehore, State: Madhya Pradesh
- Days Worked: 45/100
- Pending Payment: ₹2,400
- Language: Hindi (Bundelkhandi dialect understood)
- Active Grievance: Payment delay (Day 2 of 5)
`;

// Enhanced Mock Jobs with Fairness Engine data
export const MOCK_JOBS: any[] = [
  { 
    id: '1', 
    title: 'Pond Digging', 
    titleHindi: 'तालाब खुदाई',
    location: 'Piparia', 
    wage: 250, 
    type: 'manual', 
    icon: 'fa-person-digging', 
    distance: '2 km',
    distanceKm: 2,
    availableSlots: 15,
    startDate: new Date(Date.now() + 24*60*60*1000).toISOString(),
    workDays: 10,
    description: 'Pond construction work under MGNREGA',
    descriptionHindi: 'मनरेगा के तहत तालाब निर्माण कार्य',
    fairnessScore: 85,
    allocationReason: 'Priority given to workers with less than 50 days worked',
    priorityGroups: ['SC/ST', 'Women', 'Less work days'],
    applicants: 45
  },
  { 
    id: '2', 
    title: 'Tree Plantation', 
    titleHindi: 'पेड़ लगाना',
    location: 'Sehore', 
    wage: 220, 
    type: 'agriculture', 
    icon: 'fa-seedling', 
    distance: '5 km',
    distanceKm: 5,
    availableSlots: 20,
    startDate: new Date(Date.now() + 3*24*60*60*1000).toISOString(),
    workDays: 7,
    description: 'Afforestation drive under Van Mahotsav',
    descriptionHindi: 'वन महोत्सव के तहत वृक्षारोपण',
    fairnessScore: 72,
    priorityGroups: ['Women', 'Youth'],
    applicants: 32
  },
  { 
    id: '3', 
    title: 'School Painting', 
    titleHindi: 'स्कूल पेंटिंग',
    location: 'Block Center', 
    wage: 350, 
    type: 'skilled', 
    icon: 'fa-paint-roller', 
    distance: '8 km',
    distanceKm: 8,
    availableSlots: 8,
    startDate: new Date(Date.now() + 5*24*60*60*1000).toISOString(),
    workDays: 5,
    description: 'Skilled painting work - training certificate preferred',
    descriptionHindi: 'कुशल पेंटिंग कार्य - प्रशिक्षण प्रमाणपत्र वाले को प्राथमिकता',
    requirements: ['Painting training certificate', 'Experience preferred'],
    fairnessScore: 68,
    priorityGroups: ['Skilled workers'],
    applicants: 12
  },
  {
    id: '4',
    title: 'Road Repair',
    titleHindi: 'सड़क मरम्मत',
    location: 'Rampur',
    wage: 280,
    type: 'manual',
    icon: 'fa-road',
    distance: '1 km',
    distanceKm: 1,
    availableSlots: 25,
    startDate: new Date(Date.now() + 2*24*60*60*1000).toISOString(),
    workDays: 15,
    description: 'Village road repair and maintenance',
    descriptionHindi: 'गाँव की सड़क मरम्मत और रखरखाव',
    fairnessScore: 90,
    priorityGroups: ['All eligible workers'],
    applicants: 58
  }
];

// Enhanced Mock Schemes with eligibility and match scores
export const MOCK_SCHEMES: any[] = [
  { 
    id: '1', 
    name: 'MGNREGA', 
    nameHindi: 'मनरेगा',
    description: '100 days of guaranteed rural employment',
    descriptionHindi: '100 दिनों का गारंटीशुदा ग्रामीण रोजगार',
    benefit: 'Employment',
    benefitType: 'employment',
    eligibility: ['Rural household', 'Adult member', 'Job card holder'],
    matchScore: 98,
    isApplied: true,
    applicationStatus: 'approved',
    documents: ['Job Card', 'Aadhaar Card'],
    helplineNumber: '1800-111-555',
    applicantsFromVillage: 45
  },
  { 
    id: '2', 
    name: 'PM Awas Yojana', 
    nameHindi: 'प्रधानमंत्री आवास योजना',
    description: 'Housing for all rural families (Gramin)',
    descriptionHindi: 'सभी ग्रामीण परिवारों के लिए आवास',
    benefit: 'Housing',
    benefitType: 'housing',
    eligibility: ['Houseless', 'Living in kutcha house', 'BPL family'],
    matchScore: 85,
    isApplied: false,
    documents: ['Aadhaar Card', 'BPL Certificate', 'Land documents'],
    lastDate: '2026-03-31',
    helplineNumber: '1800-11-6446',
    applicantsFromVillage: 23
  },
  { 
    id: '3', 
    name: 'Ayushman Bharat', 
    nameHindi: 'आयुष्मान भारत',
    description: 'Free health insurance up to ₹5 lakh',
    descriptionHindi: '₹5 लाख तक मुफ्त स्वास्थ्य बीमा',
    benefit: 'Healthcare',
    benefitType: 'healthcare',
    eligibility: ['BPL family', 'SECC listed'],
    matchScore: 92,
    isApplied: true,
    applicationStatus: 'approved',
    documents: ['Aadhaar Card', 'Ration Card'],
    helplineNumber: '14555',
    applicantsFromVillage: 67
  },
  {
    id: '4',
    name: 'PM-KISAN',
    nameHindi: 'पीएम-किसान',
    description: '₹6000 yearly direct benefit for farmers',
    descriptionHindi: 'किसानों को ₹6000 वार्षिक सीधी सहायता',
    benefit: 'Financial',
    benefitType: 'financial',
    eligibility: ['Land owning farmer', 'Aadhaar linked'],
    matchScore: 75,
    isApplied: false,
    documents: ['Land records', 'Aadhaar Card', 'Bank account'],
    lastDate: '2026-06-30',
    helplineNumber: '155261',
    applicantsFromVillage: 34
  },
  {
    id: '5',
    name: 'Widow Pension',
    nameHindi: 'विधवा पेंशन',
    description: 'Monthly pension for widows',
    descriptionHindi: 'विधवाओं के लिए मासिक पेंशन',
    benefit: 'Pension',
    benefitType: 'pension',
    eligibility: ['Widow', 'Age 18+', 'BPL'],
    matchScore: 0, // Not applicable to current user
    isApplied: false,
    documents: ['Death certificate of spouse', 'Aadhaar Card'],
    helplineNumber: '1800-180-5678',
    applicantsFromVillage: 12
  }
];

// Success Stories for Wellbeing Module
export const SUCCESS_STORIES = [
  {
    id: '1',
    userName: 'रामलाल यादव',
    userVillage: 'Piparia',
    story: 'SATHI helped me resolve my payment issue in just 3 days. I was very worried but the 5-day promise worked!',
    storyHindi: 'साथी ने मेरी पैसों की समस्या सिर्फ 3 दिन में हल कर दी। मैं बहुत चिंतित था लेकिन 5-दिन का वादा काम आया!',
    category: 'payment',
    date: '2026-01-20',
    avatar: 'https://picsum.photos/seed/user1/100'
  },
  {
    id: '2',
    userName: 'सुमित्रा देवी',
    userVillage: 'Karnapur',
    story: 'I learned masonry through SATHI videos and now earn ₹500/day instead of ₹200.',
    storyHindi: 'मैंने साथी के वीडियो से राजमिस्त्री का काम सीखा और अब ₹200 की जगह ₹500/दिन कमाती हूं।',
    category: 'skill',
    date: '2026-01-15',
    avatar: 'https://picsum.photos/seed/user2/100'
  },
  {
    id: '3',
    userName: 'मोहन लाल',
    userVillage: 'Singhpur',
    story: 'Got my job card issued after filing complaint through voice. No reading required!',
    storyHindi: 'आवाज से शिकायत करके जॉब कार्ड मिल गया। पढ़ना नहीं आता तो भी हो गया!',
    category: 'grievance',
    date: '2026-01-10',
    avatar: 'https://picsum.photos/seed/user3/100'
  }
];

// Counselor information for Mental Wellbeing
export const COUNSELORS = [
  {
    name: 'डॉ. मीना शर्मा',
    phone: '+91 9876543220',
    language: ['Hindi', 'Bhojpuri'],
    available: true,
    specialization: 'General counseling'
  },
  {
    name: 'श्री राजेश कुमार',
    phone: '+91 9876543221',
    language: ['Hindi', 'Awadhi'],
    available: true,
    specialization: 'Financial stress'
  }
];

// Supported Languages as per unified.md
export const SUPPORTED_LANGUAGES = [
  { code: 'hi-IN', name: 'हिंदी', nameEn: 'Hindi' },
  { code: 'bn-IN', name: 'বাংলা', nameEn: 'Bengali' },
  { code: 'te-IN', name: 'తెలుగు', nameEn: 'Telugu' },
  { code: 'mr-IN', name: 'मराठी', nameEn: 'Marathi' },
  { code: 'ta-IN', name: 'தமிழ்', nameEn: 'Tamil' },
  { code: 'gu-IN', name: 'ગુજરાતી', nameEn: 'Gujarati' },
  { code: 'kn-IN', name: 'ಕನ್ನಡ', nameEn: 'Kannada' },
  { code: 'or-IN', name: 'ଓଡ଼ିଆ', nameEn: 'Odia' },
  { code: 'ml-IN', name: 'മലയാളം', nameEn: 'Malayalam' },
  { code: 'pa-IN', name: 'ਪੰਜਾਬੀ', nameEn: 'Punjabi' },
  { code: 'as-IN', name: 'অসমীয়া', nameEn: 'Assamese' },
  // Dialects
  { code: 'bho-IN', name: 'भोजपुरी', nameEn: 'Bhojpuri' },
  { code: 'raj-IN', name: 'राजस्थानी', nameEn: 'Rajasthani' },
  { code: 'chh-IN', name: 'छत्तीसगढ़ी', nameEn: 'Chhattisgarhi' },
  { code: 'awa-IN', name: 'अवधी', nameEn: 'Awadhi' }
];

// UI Mode Descriptions
export const UI_MODE_INFO = {
  standard: {
    name: 'Standard',
    nameHindi: 'सामान्य',
    description: 'Full text and icons interface'
  },
  picture: {
    name: 'Picture Mode',
    nameHindi: 'तस्वीर मोड',
    description: 'Large icons, minimal text - for illiterate users'
  },
  high_contrast: {
    name: 'High Contrast',
    nameHindi: 'उच्च कंट्रास्ट',
    description: 'Black background, yellow text - for vision impaired'
  }
};
