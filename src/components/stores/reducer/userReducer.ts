import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../interfaces/stateInterface';

const initialState: UserState = {
  id: -1,
  name: '',
  role: 'ROLE_USER',
  isLoggedIn: false,
  account: '',
  phone: '',
  email: '',
  community: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      Object.assign(state, actions.payload);
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
