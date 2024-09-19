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
  orderBy: { type: 'DESC' },
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
    setPostListOrderBy: (state, actions) => {
      console.log(actions.payload);
      Object.assign(state.orderBy, actions.payload);
    },
    resetPostList: () => initialState,
  },
});

export const {
  setPostListOrderByAsc,
  setPostListOrderByDesc,
  setPostListOrderBy,
  resetPostList,
} = postListSlice.actions;
export default postListSlice.reducer;
