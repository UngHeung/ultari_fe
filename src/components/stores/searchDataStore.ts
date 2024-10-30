import { create } from 'zustand';
import { PostOptions } from '../post/interfaces/postInterfaces';

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
