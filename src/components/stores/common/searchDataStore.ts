import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { create } from 'zustand';

export interface SearchListStore {
  list: PostOptions[];
  setList: (date: PostOptions[]) => void;
  resetList: () => void;
}

const useSearchListStore = create<SearchListStore>(set => ({
  list: [],
  setList: (newList: PostOptions[]) => set({ list: [...newList] }),
  resetList: () => set({ list: [] }),
}));

export default useSearchListStore;
