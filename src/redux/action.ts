// src/redux/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuizSettings, Question } from '../types';

// Define a type for the response from the API
interface FetchQuestionsResponse {
  results: Question[];
}

// Asynchronous action to fetch quiz questions from an API
export const fetchQuestions = createAsyncThunk<
  FetchQuestionsResponse,
  QuizSettings,
  { rejectValue: string }
>(
  'quiz/fetchQuestions',
  async (settings, { rejectWithValue }) => {
    const { category, difficulty, numQuestions } = settings;
    
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue('Failed to fetch questions.');
      }
      
      // Format questions to include a combined options array (for choices)
      const formattedData = data.results.map((question: Question) => ({
        ...question,
        options: [...question.incorrect_answers, question.correct_answer].sort(
          () => Math.random() - 0.5
        ),
      }));

      return { results: formattedData };
    } catch (error) {
      return rejectWithValue('An error occurred while fetching questions.');
    }
  }
);

// Action to reset the quiz state
export const resetQuiz = () => ({
  type: 'quiz/reset',
});


