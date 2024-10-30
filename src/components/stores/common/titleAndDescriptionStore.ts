import { create } from 'zustand';

export interface TitleAndDescriptionStore {
  title: string;
  setTitle: (title: string) => void;
  resetTitle: () => void;
  description: string;
  setDescription: (title: string) => void;
  resetDescription: () => void;
}

const useTitleAndDescStore = create<TitleAndDescriptionStore>(set => ({
  title: '',
  setTitle: (title: string) => set({ title }),
  resetTitle: () => set({ title: '' }),

  description: '',
  setDescription: (description: string) => set({ description }),
  resetDescription: () => set({ description: '' }),
}));

export default useTitleAndDescStore;
