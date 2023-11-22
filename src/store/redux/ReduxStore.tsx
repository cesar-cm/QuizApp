import {configureStore} from '@reduxjs/toolkit';
import {sessionSlice} from './states/sessionState';
import {UserSession} from '../sessionStorage/useSessionStorage';

// interface of main state
export interface AppStore {
  session: UserSession;
}

export default configureStore<AppStore>({
  reducer: {
    session: sessionSlice.reducer,
  },
});
