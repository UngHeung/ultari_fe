import { create } from 'zustand';
import { UserOptions } from '../../auth/interfaces/authInterface';

export interface UserStoreOption extends Partial<UserOptions> {
  path?: string;
}

const initialState: UserStoreOption = {
  id: -1,
  name: '',
  role: 'ROLE_USER',
  account: '',
  phone: '',
  email: '',
  community: '',
};

export interface UserStore {
  user: UserStoreOption;
  setUser: (user: UserStoreOption) => void;
  resetUser: () => void;
}

const useUserStore = create<UserStore>(set => ({
  user: initialState,
  setUser: (user: UserStoreOption) => set({ user }),
  resetUser: () => set({ user: initialState }),
}));

export default useUserStore;
