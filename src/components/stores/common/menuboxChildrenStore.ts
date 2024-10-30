import { create } from 'zustand';

export interface MenuBoxChildStore {
  children: JSX.Element | null;
  setChild: (child: JSX.Element) => void;
  resetChild: () => void;
}

const useMenuBoxChildStore = create<MenuBoxChildStore>(set => ({
  children: null,
  setChild: (children: JSX.Element) => set({ children }),
  resetChild: () => set({ children: null }),
}));

export default useMenuBoxChildStore;
