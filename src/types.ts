export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

export interface InviteCode {
  id: string;
  code: string;
  used: boolean;
  createdAt: string;
}

export interface QuizSettings {
  startTime: string | null;
  endTime: string | null;
  isActive: boolean;
}