import { createSlice } from '@reduxjs/toolkit';
import { ModalState } from '../interfaces/stateInterface';

const initialState: ModalState = {
  title: '',
  type: 'alert',
  success: undefined,
  message: '',
  routerType: undefined,
  leftPath: '',
  rightPath: '',
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
