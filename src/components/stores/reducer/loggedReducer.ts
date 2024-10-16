import { createSlice } from '@reduxjs/toolkit';
import { LoggedState } from '../interfaces/stateInterface';

const initialState: LoggedState = {
  isLoggedIn: false,
};

export const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setLogged: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetLogged: () => initialState,
  },
});

export const { setLogged, resetLogged } = loggedSlice.actions;
export default loggedSlice.reducer;
