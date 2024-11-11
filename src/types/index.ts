// src/types/index.ts
export interface QuizSettings {
    name: string;
    category: string;
    difficulty: string;
    numQuestions: number;
  }
  
  export interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    options: string[];
  }
  
  
  