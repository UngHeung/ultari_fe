import { createSlice } from '@reduxjs/toolkit';
import { PostListState } from '../interfaces/stateInterface';

const initialState: PostListState = {
  asc: {
    list: [],
    count: 0,
    next: '',
    firstLoad: true,
  },
  desc: {
    list: [],
    count: 0,
    next: '',
    firstLoad: true,
  },
  likes: {
    list: [],
    count: 0,
    next: '',
    firstLoad: true,
  },
  views: {
    list: [],
    count: 0,
    next: '',
    firstLoad: true,
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
    setPostListOrderByViews: (state, actions) => {
      Object.assign(state.views, actions.payload);
    },
    resetPostList: () => initialState,
  },
});

export const {
  setPostListOrderByAsc,
  setPostListOrderByDesc,
  setPostListOrderByLikes,
  setPostListOrderByViews,
  resetPostList,
} = postListSlice.actions;
export default postListSlice.reducer;
