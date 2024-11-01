import { create } from 'zustand';

export interface IsShowStore {
  menuIsShow: boolean;
  setMenuIsShow: (menuIsShow: boolean) => void;
  toggleMenuIsShow: () => void;

  searchIsShow: boolean;
  setSearchIsShow: (searchIsShow: boolean) => void;
  toggleSearchIsShow: () => void;

  resetIsShowAll: () => void;
}

const useIsShowStore = create<IsShowStore>(set => ({
  menuIsShow: false,
  setMenuIsShow: (menuIsShow: boolean) => set({ menuIsShow }),
  toggleMenuIsShow: () => set(state => ({ menuIsShow: !state.menuIsShow })),

  searchIsShow: false,
  setSearchIsShow: (searchIsShow: boolean) => set({ searchIsShow }),
  toggleSearchIsShow: () =>
    set(state => ({ searchIsShow: !state.searchIsShow })),

  resetIsShowAll: () => set({ menuIsShow: false, searchIsShow: false }),
}));

export default useIsShowStore;
