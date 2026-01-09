
export type AppView = 'dashboard' | 'current-affairs' | 'chat' | 'pyq' | 'predictor' | 'saved-answers' | 'exams';

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
