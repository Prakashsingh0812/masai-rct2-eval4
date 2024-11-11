// src/redux/reducers.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestions } from './action';
import { Question } from '../types';

interface QuizState {
  questions: Question[];
  loading: boolean;
  error: string | null;
  score: number;
}

const initialState: QuizState = {
  questions: [],
  loading: false,
  error: null,
  score: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 1;
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.loading = false;
      state.error = null;
      state.score = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<{ results: Question[] }>) => {
        state.questions = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load questions';
      });
  },
});

export const { incrementScore, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;


