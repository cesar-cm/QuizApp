import {configureStore} from '@reduxjs/toolkit';
import {sessionSlice} from './states/sessionState';
import {UserSession} from '../sessionStorage/useSessionStorage';
import {Quiz} from '../models/Quiz';
import {quizSlice} from './states/quizStore';

// interface of main state
export interface AppStore {
  session: UserSession;
  quiz: Quiz;
}

export default configureStore<AppStore>({
  reducer: {
    session: sessionSlice.reducer,
    quiz: quizSlice.reducer,
  },
});
