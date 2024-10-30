import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ProfileStore {
  path: string;
  setPath: (path: string) => void;
  resetPath: () => void;
}

const useProfileStore = create(
  persist<ProfileStore>(
    set => ({
      path: '',
      setPath: (path: string) => set({ path }),
      resetPath: () => set({ path: '' }),
    }),
    {
      name: 'profile',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useProfileStore;
