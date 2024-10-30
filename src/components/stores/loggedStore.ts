import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LoggedStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  resetIsLoggedIn: () => void;
}

const useLoggedStore = create(
  persist<LoggedStore>(
    set => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      resetIsLoggedIn: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'logged',
    },
  ),
);

export default useLoggedStore;
