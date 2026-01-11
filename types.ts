export type AppView = 'dashboard' | 'current-affairs' | 'chat' | 'pyq' | 'predictor' | 'saved-answers' | 'exams' | 'syllabus' | 'study-plan' | 'admin-login' | 'admin-dashboard' | 'contact';

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  groundingLinks?: GroundingChunk[];
}

export interface CurrentAffairsCategory {
  category: string;
  summary: string;
  impact: string;
}

export interface PYQAnalysis {
  question: string;
  correctAnswer: string;
  explanation: string;
  syllabusUnit: string;
}

export interface SavedItem {
  id: string;
  type: 'current-affairs' | 'pyq' | 'chat';
  title: string;
  content: string;
  timestamp: number;
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  applyLink: string;
  date: string;
  isActive: boolean;
}

export interface StudyTask {
  id: string;
  exam: string;
  unit: string;
  topic: string;
  isCompleted: boolean;
  createdAt: number;
}