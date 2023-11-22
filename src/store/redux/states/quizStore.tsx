import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Quiz, QuizState} from '../../models/Quiz';
import {HttpClient} from '../../../client/HttpClient';
import {Question} from '../../models/Question';
import produce, {Draft} from 'immer';

const initialState: Quiz = {
  questions: [],
  state: QuizState.unStarted,
};

const fetchQuizHandler = async (): Promise<Quiz> => {
  console.log('fetching quiz');
  const client = new HttpClient();
  return new Promise<Quiz>(async (resolve, reject) => {
    try {
      const data = await client.getQuestions();
      const q: Quiz = new Quiz(data, QuizState.unStarted);
      console.log('fetching quiz SUCCESS');
      console.log(`fetch quiz status: ${q.state}`);
      resolve(q);
    } catch (error) {
      console.error('Error on fecth quiz: ', error);
      reject(error);
    }
  });
};

const fetchQuiz = createAsyncThunk('quiz/fetchQuiz', async () => {
  const quiz = await fetchQuizHandler();
  console.log(`redux quiz: ${JSON.stringify(quiz)}`);
  return quiz;
});

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: initialState,
  reducers: {
    updateQuizStatus: (state, action: PayloadAction<QuizState>) => {
      const newQuizState = action.payload;
      state.state = newQuizState;
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const newQuestion: Question = action.payload;
      state.questions = produce(state.questions, (draft: Draft<Question[]>) => {
        const index = draft.findIndex(q => q.id === newQuestion.id);
        if (index !== -1) {
          draft[index] = newQuestion;
        }
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchQuiz.fulfilled,
      (state, action: PayloadAction<Quiz>) => {
        state.questions = action.payload.questions;
      },
    );
  },
});

export const {updateQuizStatus, updateQuestion} = quizSlice.actions;
export {fetchQuiz};
export default quizSlice.reducer;
