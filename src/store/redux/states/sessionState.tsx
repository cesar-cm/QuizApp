import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import useSessionStorage, {
  UserSession,
} from '../../sessionStorage/useSessionStorage';

// eslint-disable-next-line react-hooks/rules-of-hooks
const sessionStorage = useSessionStorage();

const sessionInitialState: UserSession = {
  isLoggedIn: false,
};

const sessionLogInState: UserSession = {
  isLoggedIn: true,
};

const checkSession = async (): Promise<UserSession | undefined> => {
  try {
    const session = await sessionStorage.onGetSession();
    console.log('Checking user session:', session);
    return session;
  } catch (error) {
    console.error('Error checking session:', error);
    throw error;
  }
};
// CaseReducer<SessionProps, { payload: any; type: string; }>
const fetchSession = createAsyncThunk(
  'userSession/currentSession',
  async () => {
    const session = await checkSession();
    if (session && session.isLoggedIn === true) {
      logIn();
    } else {
      logIn();
    }
    console.log(`redux session: ${JSON.stringify(session)}`);
    return session;
  },
);

export const sessionSlice = createSlice({
  name: 'userSession',
  initialState: sessionInitialState,
  reducers: {
    logIn: () => {
      sessionStorage.onSaveSession(true);
      return sessionLogInState;
    },
    logOut: () => {
      sessionStorage.onSaveSession(false);
      return sessionInitialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSession.fulfilled, (state, action) => {
      action.payload;
    });
  },
});

export const {logIn, logOut} = sessionSlice.actions;
export {fetchSession};
export default sessionSlice.reducer;
