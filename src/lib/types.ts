export interface Question {
  q: string;
  answer: number;
  options: number[];
  mistakes?: number;
  lastTry?: Date;
  interval?: number; // in days?
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  slug: string;
  questions: Question[];
  unlocked?: boolean;
  unlocks?: number;
}
