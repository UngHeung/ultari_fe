import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { createSlice } from '@reduxjs/toolkit';

export type OrderTypes = 'DESC' | 'ASC';

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
  orderBy: {
    type: OrderTypes;
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
