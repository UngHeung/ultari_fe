import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { createSlice } from '@reduxjs/toolkit';

export interface PostListOptions {
  asc: {
    list: PostOptions[];
    count: number;
    lastIndex: number;
    next: string;
  };
  desc: {
    list: PostOptions[];
    count: number;
    lastIndex: number;
    next: string;
  };
}

const initialState: PostListOptions = {
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
    resetPostList: () => initialState,
  },
});

export const { setPostListOrderByAsc, setPostListOrderByDesc, resetPostList } =
  postListSlice.actions;
export default postListSlice.reducer;
