import { PostOptions } from '@/components/post/interfaces/postInterfaces';
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
  updateAsc: (id: number, newPost: PostOptions) => void;

  desc: OrderdPostListState;
  setDesc: (state: OrderdPostListState) => void;
  updateDesc: (id: number, newPost: PostOptions) => void;

  likes: OrderdPostListState;
  setLikes: (state: OrderdPostListState) => void;
  updateLikes: (id: number, newPost: PostOptions) => void;

  views: OrderdPostListState;
  setViews: (state: OrderdPostListState) => void;
  updateViews: (id: number, newPost: PostOptions) => void;

  orderBy: OrderTypes;
  setOrderBy: (type: OrderTypes) => void;

  sortBy: SortTypes;
  setSortBy: (type: SortTypes) => void;

  resetList: () => void;
}

const usePostListStore = create<PostListStore>(set => ({
  asc: initialState.asc,
  setAsc: (asc: OrderdPostListState) => set({ asc }),
  updateAsc: (id: number, newPost: PostOptions) =>
    set(state => ({
      asc: {
        data: state.asc.data.map(item => (item.id === id ? newPost : item)),
        cursor: state.asc.cursor,
      },
    })),

  desc: initialState.desc,
  setDesc: (desc: OrderdPostListState) => set({ desc }),
  updateDesc: (id: number, newPost: PostOptions) =>
    set(state => ({
      desc: {
        data: state.desc.data.map(item => (item.id === id ? newPost : item)),
        cursor: state.desc.cursor,
      },
    })),

  likes: initialState.likes,
  setLikes: (likes: OrderdPostListState) => set({ likes }),
  updateLikes: (id: number, newPost: PostOptions) =>
    set(state => ({
      likes: {
        data: state.likes.data.map(item =>
          item.id === id ? { ...item, newPost } : item,
        ),
        cursor: state.likes.cursor,
      },
    })),

  views: initialState.views,
  setViews: (views: OrderdPostListState) => set({ views }),
  updateViews: (id: number, newPost: PostOptions) =>
    set(state => ({
      views: {
        data: state.views.data.map(item =>
          item.id === id ? { ...item, newPost } : item,
        ),
        cursor: state.views.cursor,
      },
    })),

  orderBy: initialState.orderBy,
  setOrderBy: (orderBy: OrderTypes) => set({ orderBy }),

  sortBy: initialState.sortBy,
  setSortBy: (sortBy: SortTypes) => set({ sortBy }),

  resetList: () => set({ ...initialState }),
}));

export default usePostListStore;
