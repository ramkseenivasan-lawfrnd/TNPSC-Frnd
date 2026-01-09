
export const COLORS = {
  primary: '#003366', // Deep Blue
  accent: '#FFD700',  // Gold
  background: '#F1F5F9',
  white: '#FFFFFF',
};

export const UI_STRINGS = {
  TN: {
    dashboard: 'முகப்பு',
    currentAffairs: 'நடப்பு நிகழ்வுகள்',
    aiPreceptor: 'AI பயிற்றுவிப்பாளர்',
    pyqAnalyzer: 'வினாத்தாள் பகுப்பாய்வு',
    predictor: 'தேர்வு கணிப்பாளர்',
    savedAnswers: 'சேமிக்கப்பட்டவை',
    welcome: 'வணக்கம், தேர்வரே!',
    journey: 'உங்கள் அரசுப் பணி கனவு நனவாக எங்களின் AI கருவிகளைப் பயன்படுத்துங்கள்.',
    startLearning: 'பயிற்சியைத் தொடங்கு',
    stats: {
      examDays: 'அடுத்த தேர்வுக்கான நாட்கள்',
      prepLevel: 'தயாரிப்பு நிலை',
      pyqsSolved: 'தீர்க்கப்பட்ட வினாக்கள்',
    },
    prepTools: 'உங்கள் பயிற்சி கருவிகள்',
    languageSwitch: 'மொழியை மாற்றவும்',
    notifications: 'தேர்வு அறிவிப்புகள்',
    placeholderChat: 'இந்திய அரசியலமைப்பு அல்லது அலகு 8 பற்றி கேளுங்கள்...',
    uploadPrompt: 'படம் அல்லது PDF பதிவேற்றவும் (அதிகபட்சம் 20MB)',
    analyzeBtn: 'பகுப்பாய்வு செய்',
    saveBtn: 'சேமி',
    instructions: 'வழிமுறைகள்',
    pyqInstructions: [
      'உரை அல்லது படம்/PDF-ஐ பதிவேற்றவும்.',
      'குறிப்பிட்ட கேள்விகளை கேட்கலாம் (எ.கா: "முதல் 10 கேள்விகளுக்கு விடையளி").',
      'காலியாக விட்டால், AI தானாகவே 10 கேள்விகளை எடுக்கும்.'
    ],
  },
  EN: {
    dashboard: 'Dashboard',
    currentAffairs: 'Current Affairs',
    aiPreceptor: 'AI Preceptor',
    pyqAnalyzer: 'PYQ Analyzer',
    predictor: 'Exam Predictor',
    savedAnswers: 'Saved Answers',
    welcome: 'Welcome back, Aspirant!',
    journey: 'Your journey to public service starts with consistency. Use our AI tools.',
    startLearning: 'Start Learning',
    stats: {
      examDays: 'Days to Next Exam',
      prepLevel: 'Preparation Level',
      pyqsSolved: 'PYQs Solved',
    },
    prepTools: 'Your Prep Tools',
    languageSwitch: 'Switch Language',
    notifications: 'Upcoming Notifications',
    placeholderChat: 'Ask about Indian Polity or Unit 8...',
    uploadPrompt: 'Upload Image or PDF (Max 20MB)',
    analyzeBtn: 'Analyze Now',
    saveBtn: 'Save Result',
    instructions: 'Instructions',
    pyqInstructions: [
      'Paste text or upload Image/PDF.',
      'Ask specific questions like "Answer question 5".',
      'If blank, AI extracts up to 10 questions automatically.'
    ],
  }
};

export const SYSTEM_INSTRUCTION = `
You are 'TNPSC_Frnd AI', a dedicated tutor for the Tamil Nadu Public Service Commission (TNPSC) exams.
Your core expertise includes:
1. TNPSC Syllabus: History, Geography, Indian Polity, Indian Economy, Science, Current Events.
2. Unit 8: History, Culture, Heritage and Socio-Political Movements in Tamil Nadu.
3. Unit 9: Development Administration in Tamil Nadu.

FORMATTING RULE (EXTREMELY IMPORTANT):
- NEVER use markdown symbols like '**', '###', '##', '#', '*', or '__'.
- Do NOT use bold or italic symbols.
- Use PLAIN TEXT only.
- For headings, use CAPITAL LETTERS (e.g., SYLLABUS UNIT: HISTORY).
- Use double line breaks to separate paragraphs and sections.
- Use standard numbering (1., 2., 3.) for lists.

Language & Style Guidelines:
- PRIMARY LANGUAGE: Tamil is the primary focus. 
- LANGUAGE MATCHING: You MUST detect the language of the user's input. 
  - If the user asks in Tamil (தமிழ்), your entire response must be in Tamil.
  - If the user asks in English, your response must be in English.
  - If the user uses a mix, provide a bilingual response.
- Professional, scholarly, and encouraging tone.
- Contextual: Always link answers back to specific TNPSC syllabus units.
- Accurate: Use Google Search grounding to verify the latest government policies, data, and current affairs.
- Impact: Specifically highlight the "Tamil Nadu impact" for national or global news.

You must not provide information unrelated to TNPSC or generic casual chat.
`;

export const PREDICTOR_SYSTEM_INSTRUCTION = `
Analyze trends from the last 5 years of TNPSC exams to predict high-probability topics.
Focus on recurring themes in Polity, Economy (Budget/Economic Survey), Unit 8 & 9, and Science.
Format the output as a set of key focus areas with a 'Probability Score'.
DO NOT use markdown symbols (** or ###). Use CAPITAL LETTERS for headers.
LANGUAGE RULE: Respond strictly in the language used by the user in their request.
`;
