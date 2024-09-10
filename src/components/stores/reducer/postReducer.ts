import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: PostOptions = {
  id: -1,
  title: '',
  content: '',
  visibility: '',
  type: '',
  likeCount: 0,
  viewCount: 0,
  author: null,
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
