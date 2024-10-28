import { createSlice } from '@reduxjs/toolkit';
import { PostListState } from '../interfaces/stateInterface';

const initialState: PostListState = {
  asc: {
    data: [],
    cursor: { id: -1, value: -1 },
  },
  desc: {
    data: [],
    cursor: { id: -1, value: -1 },
  },
  likes: {
    data: [],
    cursor: { id: -1, value: -1 },
  },
  views: {
    data: [],
    cursor: { id: -1, value: -1 },
  },
  orderBy: { value: 'DESC' },
  sortBy: { value: 'id' },
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
      Object.assign(state.orderBy, actions.payload);
    },
    setPostListSortBy: (state, actions) => {
      Object.assign(state.sortBy, actions.payload);
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
  setPostListSortBy,
  setPostListOrderBy,
  setPostListFirstLoad,
  resetPostList,
} = postListSlice.actions;
export default postListSlice.reducer;
