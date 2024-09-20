import { createSlice } from '@reduxjs/toolkit';
import { PostListState } from '../interfaces/stateInterface';

const initialState: PostListState = {
  asc: {
    list: [],
    count: 0,
    lastIndex: 0,
    next: '',
  },
  desc: {
    list: [],
    count: 0,
    lastIndex: 0,
    next: '',
  },
  likes: {
    list: [],
    count: 0,
    lastIndex: 0,
    next: '',
  },
};

export const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    setPostListOrderByAsc: (state, actions) => {
      Object.assign(state.asc, actions.payload);
    },
    setPostListOrderByDesc: (state, actions) => {
      Object.assign(state.desc, actions.payload);
    },
    setPostListOrderByLikes: (state, actions) => {
      Object.assign(state.likes, actions.payload);
    },
    resetPostList: () => initialState,
  },
});

export const {
  setPostListOrderByAsc,
  setPostListOrderByDesc,
  setPostListOrderByLikes,
  resetPostList,
} = postListSlice.actions;
export default postListSlice.reducer;
