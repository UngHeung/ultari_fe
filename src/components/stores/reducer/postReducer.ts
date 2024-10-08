import { createSlice } from '@reduxjs/toolkit';
import { PostState } from '../interfaces/stateInterface';

const initialState: PostState = {
  id: -1,
  title: '',
  content: '',
  visibility: 'SCOPE_PUBLIC',
  contentType: 'TYPE_FREE',
  likers: [],
  likeCount: 0,
  viewCount: 0,
  author: {
    id: -1,
    account: '',
    name: '',
    phone: '',
    email: '',
    role: 'ROLE_USER',
    isLoggedIn: false,
  },
  images: [],
  createAt: '',
  updateAt: '',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, actions) => {
      Object.assign(state, actions.payload);
    },
    resetPost: () => initialState,
  },
});

export const { setPost, resetPost } = postSlice.actions;
export default postSlice.reducer;
