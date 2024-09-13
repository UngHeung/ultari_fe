import { modalType } from '@/components/modal/constants/modalConst';
import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  title?: string;
  type: modalType;
  success?: boolean;
  message: string;
  path?: string;
  modalIsShow: boolean;
}

const initialState: ModalState = {
  title: '',
  type: 'alert',
  success: false,
  message: '',
  path: '',
  modalIsShow: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetModal: () => initialState,
  },
});

export const { setModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
