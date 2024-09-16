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

export interface UserState
  extends Pick<UserOptions, 'id' | 'name' | 'role' | 'isLoggedIn'> {}

const initialState: UserState = {
  id: -1,
  name: '',
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
