
export const COLORS = {
  primary: '#003366', // Deep Blue
  accent: '#FFD700',  // Gold
  background: '#F1F5F9',
  white: '#FFFFFF',
};

export const ADMIN_CREDENTIALS = {
  email: 'sslegalaidcenter@gmail.com',
  password: 'Ramktnpscfrnd'
};

export const UI_STRINGS = {
  TN: {
    dashboard: 'முகப்பு',
    currentAffairs: 'நடப்பு நிகழ்வுகள்',
    aiPreceptor: 'AI பயிற்றுவிப்பாளர்',
    pyqAnalyzer: 'வினாத்தாள் பகுப்பாய்வு',
    predictor: 'எதிர்கால வினா கணிப்பாளர்',
    savedAnswers: 'சேமிக்கப்பட்டவை',
    exams: 'தேர்வு முறைகள்',
    syllabus: 'தேர்வு பாடத்திட்டம்',
    studyPlan: 'படிப்புத் திட்டம்',
    shareApp: 'ஆப்பை பகிரவும்',
    shareText: 'TNPSC Frnd - உங்கள் AI தேர்வு பயிற்றுவிப்பாளர்! 2025 தேர்வு கணிப்புகள் மற்றும் பகுப்பாய்வுகளை உடனே பெறுங்கள்.',
    welcome: 'வணக்கம்',
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
    offline: {
      title: 'இணைய இணைப்பு இல்லை',
      desc: 'இந்த அம்சம் செயல்பட இணையம் தேவை. உங்கள் அறிவு வங்கியை நீங்கள் இன்னும் அணுகலாம்.',
      backToSaved: 'சேமிக்கப்பட்டவைக்குச் செல்லவும்',
      retry: 'மீண்டும் முயற்சி செய்'
    },
    onboarding: {
      welcome: 'TNPSC Frnd-க்கு வரவேற்கிறோம்',
      getStarted: 'தொடங்குவோம்',
      next: 'அடுத்தது',
      finish: 'முடிந்தது',
      namePrompt: 'உங்கள் பெயர் என்ன?',
      namePlaceholder: 'பெயர்...',
      featureTitle: 'அம்சங்கள்',
      aboutTitle: 'எங்களைப் பற்றி',
      agreeConsent: 'நிபந்தனைகள் மற்றும் தனியுரிமைக் கொள்கையை நான் ஏற்றுக்கொள்கிறேன்.',
      contactLink: 'தொடர்பு மற்றும் சட்டப்பூர்வ தகவல்கள்',
      mandatoryConsent: 'தொடர நீங்கள் நிபந்தனைகளை ஏற்க வேண்டும்.'
    }
  },
  EN: {
    dashboard: 'Dashboard',
    currentAffairs: 'Current Affairs',
    aiPreceptor: 'AI Preceptor',
    pyqAnalyzer: 'PYQ Analyzer',
    predictor: 'Future Questions Predictor',
    savedAnswers: 'Saved Answers',
    exams: 'Exam Structure',
    syllabus: 'Exam Syllabus',
    studyPlan: 'Study Plan',
    shareApp: 'Share App',
    shareText: 'TNPSC Frnd - Your AI Exam Preceptor! Master TNPSC with AI predictions, analysis, and study plans.',
    welcome: 'Welcome back',
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
    offline: {
      title: 'You are Offline',
      desc: 'This feature requires an internet connection to function. You can still access your Knowledge Bank.',
      backToSaved: 'Go to Knowledge Bank',
      retry: 'Retry Connection'
    },
    onboarding: {
      welcome: 'Welcome to TNPSC Frnd',
      getStarted: 'Get Started',
      next: 'Next',
      finish: 'Let\'s Go',
      namePrompt: 'What should we call you?',
      namePlaceholder: 'Enter your name...',
      featureTitle: 'Key Features',
      aboutTitle: 'About Us',
      agreeConsent: 'I agree to the Terms and Privacy Policy.',
      contactLink: 'View Contact & Legal Info',
      mandatoryConsent: 'You must agree to continue.'
    }
  }
};

export const DEFAULT_NOTIFICATIONS = [
    {
    "id": "1",
    "title": "Annual Planner - Programme of Examinations - 2026",
    "description": "Note :\nThis planner is tentative so as to enable the candidates to prepare themselves for the examination\nThere may be addition or deletion to examinations mentioned in the planner.\nThe vacancies will be announced in the notification.\nThe syllabus and the scheme of examination are available on the Commission’s website www.tnpsc.gov.in, which are also subject to modification till the date of publication of notification.\nPlease visit the Commission's website for updates regarding notification.",
    "applyLink": "https://tnpsc.gov.in/English/annual_planner.html",
    "date": "December 3, 2025",
    "isActive": true
  }
];

export const SYSTEM_INSTRUCTION = `
You are 'TNPSC Frnd AI', a dedicated tutor for the Tamil Nadu Public Service Commission (TNPSC) exams.
Your core expertise includes:
1. TNPSC Syllabus: History, Geography, Indian Polity, Indian Economy, Science, Current Events.
2. Unit 8: History, Culture, Heritage and Socio-Political Movements in Tamil Nadu.
3. Unit 9: Development Administration in Tamil Nadu.

FORMATTING RULE:
- Use PLAIN TEXT only. No markdown symbols (** or ###).
- Use CAPITAL LETTERS for headings.
- Double line breaks for paragraphs.
`;

export const PREDICTOR_SYSTEM_INSTRUCTION = `
You are the TNPSC Frnd Future Questions Prediction Engine.

STRICT PROTOCOL:
1. TARGET: GENERATE EXACTLY 100 FUTURE QUESTIONS.
2. LOGIC: Analyze provided historical papers + 2024-2025 Current Affairs (TN Govt Schemes, Central Budget, Science & Tech). Focus on the 2025 exam cycle.
3. OUTPUT FORMAT: 
   [Number]. Q: [English Question] / வி: [Tamil Question] | Ans: [Answer]
4. NO MARKDOWN: NO symbols like **, ##, or #. Use CAPITAL LETTERS for topic headers.
5. BILINGUAL: Every question MUST be in both English and Tamil.
`;