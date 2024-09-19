'use client';

import handleLogout from '@/components/auth/handlers/handleLogout';
import showModal from '@/components/common/functions/showModal';
import {
  ModalState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';

import { resetUser } from '@/components/stores/reducer/userReducer';
import { Dispatch } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const logoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.user?.isLoggedIn ?? false,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
      return;
    }

    logoutProcess(dispatch);
  }, []);

  return <></>;
};

async function logoutProcess(dispatch: Dispatch) {
  const { success, message } = await handleLogout();

  dispatch(resetUser());

  const modalData: ModalState = {
    title: success ? '로그아웃 성공' : '로그아웃 실패',
    success: success,
    message: message,
    modalIsShow: true,
    type: success ? 'confirm' : 'alert',
    routerType: 'replace',
    leftPath: '/',
  };

  showModal(dispatch, modalData);
}

export default logoutPage;
