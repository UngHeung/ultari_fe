import { createSlice } from '@reduxjs/toolkit';
import { PostListState } from '../interfaces/stateInterface';

const initialState: PostListState = {
  asc: {
    list: [],
    count: 0,
    next: '',
  },
  desc: {
    list: [],
    count: 0,
    next: '',
  },
  likes: {
    list: [],
    count: 0,
    next: '',
  },
  views: {
    list: [],
    count: 0,
    next: '',
  },
  orderType: { value: 'DESC' },
  firstLoad: { value: true },
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
    setPostListOrderBy: (state, actions) => {
      console.log(actions.payload);
      Object.assign(state.orderType, actions.payload);
    },
    setPostListFirstLoad: (state, actions) => {
      Object.assign(state.firstLoad, actions.payload);
    },
    resetPostList: () => initialState,
  },
});

export const {
  setPostListOrderByAsc,
  setPostListOrderByDesc,
  setPostListOrderByLikes,
  setPostListOrderByViews,
  setPostListOrderBy,
  setPostListFirstLoad,
  resetPostList,
} = postListSlice.actions;
export default postListSlice.reducer;
