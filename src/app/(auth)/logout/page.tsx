'use client';

import handleLogout from '@/components/auth/handlers/handleLogout';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status, success, message } = await handleLogout();

      dispatch(
        setModal({
          title: success ? '로그아웃 성공' : '로그아웃 실패',
          success: success,
          message: message,
          modalIsShow: true,
          type: success ? 'confirm' : 'alert',
          path: '/login',
        }),
      );

      return {};
    })();
  });
  return <></>;
};

export default logout;
