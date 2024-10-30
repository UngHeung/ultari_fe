import { create } from 'zustand';
import { OrderTypes, SortTypes } from '../constants/stateOptions';
import {
  OrderdPostListState,
  PostListState,
} from '../interfaces/stateInterface';

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
  orderBy: 'DESC',
  sortBy: 'id',
};

export interface PostListStore {
  asc: OrderdPostListState;
  setAsc: (state: OrderdPostListState) => void;

  desc: OrderdPostListState;
  setDesc: (state: OrderdPostListState) => void;

  likes: OrderdPostListState;
  setLikes: (state: OrderdPostListState) => void;

  views: OrderdPostListState;
  setViews: (state: OrderdPostListState) => void;

  orderBy: OrderTypes;
  setOrderBy: (type: OrderTypes) => void;

  sortBy: SortTypes;
  setSortBy: (type: SortTypes) => void;
}

const usePostStore = create<PostListStore>(set => ({
  asc: initialState.asc,
  setAsc: (asc: OrderdPostListState) => set({ asc }),

  desc: initialState.desc,
  setDesc: (desc: OrderdPostListState) => set({ desc }),

  likes: initialState.likes,
  setLikes: (likes: OrderdPostListState) => set({ likes }),

  views: initialState.views,
  setViews: (views: OrderdPostListState) => set({ views }),

  orderBy: initialState.orderBy,
  setOrderBy: (orderBy: OrderTypes) => set({ orderBy }),

  sortBy: initialState.sortBy,
  setSortBy: (sortBy: SortTypes) => set({ sortBy }),
}));

export default usePostStore;
