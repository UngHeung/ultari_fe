import { create } from 'zustand';

export interface MenuBoxChildStore {
  children: React.ReactNode | null;
  setChild: (child: React.ReactNode) => void;
  resetChild: () => void;
}

const useMenuBoxChildStore = create<MenuBoxChildStore>(set => ({
  children: null,
  setChild: (children: React.ReactNode) => set({ children }),
  resetChild: () => set({ children: null }),
}));

export default useMenuBoxChildStore;
