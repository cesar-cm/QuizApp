import {createSlice} from '@reduxjs/toolkit';

export interface sessionProps {
  isLogged: boolean;
}

const sessionInitialState: sessionProps = {
  isLogged: false,
};

const sessionLogInState: sessionProps = {
  isLogged: true,
};

export const sessionSlice = createSlice({
  name: 'userSession',
  initialState: sessionInitialState,
  // actions over the state
  reducers: {
    logIn: () => sessionLogInState,
    logOut: () => sessionInitialState,
  },
});

export const {logIn, logOut} = sessionSlice.actions;
export default sessionSlice.reducer;
