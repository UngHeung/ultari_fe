import { createSlice } from '@reduxjs/toolkit';

export interface UserOptions {
  id: number;
  account: string;
  name: string;
  phone: string;
  email: string;
  profile?: string;
  role: string;
  isLoggedIn: boolean;
}

const initialState: UserOptions = {
  id: -1,
  account: '',
  name: '',
  phone: '',
  email: '',
  profile: '',
  role: '',
  isLoggedIn: false,
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
