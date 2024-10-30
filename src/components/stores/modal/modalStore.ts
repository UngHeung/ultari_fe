import { ModalType } from '@/components/modal/constants/modalConst';
import { create } from 'zustand';
import { RouterType } from '../constants/stateOptions';

const initialState: ModalStoreOptions = {
  title: '',
  type: 'alert',
  success: undefined,
  message: '',
  routerType: undefined,
  leftPath: '',
  rightPath: '',
  modalIsShow: false,
};

export interface ModalStoreOptions {
  title?: string;
  type: ModalType;
  success?: boolean;
  message: string;
  routerType: RouterType;
  leftPath?: string;
  rightPath?: string;
  modalIsShow: boolean;
}

export interface ModalStore {
  modal: ModalStoreOptions;
  setModal: (modal: ModalStoreOptions) => void;
  resetModal: () => void;
}

const useModalStore = create<ModalStore>(set => ({
  modal: initialState,
  setModal: (modal: ModalStoreOptions) => set({ modal }),
  resetModal: () => set({ modal: initialState }),
}));

export default useModalStore;
