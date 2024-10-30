import { create } from 'zustand';

export interface KeywordStore {
  keyword: string;
  setKeyword: (keyword: string) => void;
  resetKeyword: () => void;
}

const useKeywordStore = create<KeywordStore>(set => ({
  keyword: '',
  setKeyword: (keyword: string) => set({ keyword: keyword }),
  resetKeyword: () => set({ keyword: '' }),
}));

export default useKeywordStore;
