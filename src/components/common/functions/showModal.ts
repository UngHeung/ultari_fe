import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { Dispatch } from '@reduxjs/toolkit';

const showModal = (dispatch: Dispatch, modalData: ModalState) => {
  dispatch(setModal(modalData));
};

export default showModal;
