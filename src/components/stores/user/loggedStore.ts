import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface LoggedStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: true) => void;
  resetIsLoggedIn: () => void;
  isHydrated: boolean;
}

const useLoggedStore = create(
  persist<LoggedStore>(
    set => ({
      isLoggedIn: false,
      isHydrated: false,
      setIsLoggedIn: (isLoggedIn: true) => set({ isLoggedIn }),
      resetIsLoggedIn: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'logged',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        state!.isHydrated = true;
      },
    },
  ),
);

export default useLoggedStore;
