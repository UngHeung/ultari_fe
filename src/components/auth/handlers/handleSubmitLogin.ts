import showModal from '@/components/common/functions/showModal';
import {
  ModalState,
  UserState,
} from '@/components/stores/interfaces/stateInterface';
import { setUser } from '@/components/stores/reducer/userReducer';
import { Dispatch } from '@reduxjs/toolkit';
import { FormEvent } from 'react';
import getUserDataFromToken from '../functions/getUserDataFromToken';
import handleLogin from './handleLogin';

export async function handleSubmit(
  event: FormEvent<HTMLFormElement>,
  dispatch: Dispatch,
  setDisabled: any,
) {
  event.preventDefault();

  setDisabled(true);

  const { success, message } = await handleLogin(event);

  if (success) {
    const userData: Omit<UserState, 'isLoggedIn'> = getUserDataFromToken();

    dispatch(
      setUser({
        ...userData,
        isLoggedIn: true,
      }),
    );
  }

  const modalData: ModalState = {
    success,
    message,
    modalIsShow: true,
    type: success ? 'confirm' : 'alert',
    routerType: 'back',
  };

  showModal(dispatch, modalData);
  setDisabled(false);
}
