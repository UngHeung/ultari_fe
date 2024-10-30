import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    },
  ),
);

export default useProfileStore;
