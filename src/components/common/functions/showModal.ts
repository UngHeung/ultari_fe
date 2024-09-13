import { ModalState, setModal } from '@/components/stores/reducer/modalRducer';
import { Dispatch } from '@reduxjs/toolkit';

export const showModal = (dispatch: Dispatch, modalData: ModalState) => {
  dispatch(setModal(modalData));
};
