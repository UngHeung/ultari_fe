'use client';

import handleLogout from '@/components/auth/handlers/handleLogout';
import { SliceOptions } from '@/components/stores/constants/stateOptions';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { resetUser } from '@/components/stores/reducer/userReducer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.user?.isLoggedIn ?? false,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router.back();
      return;
    }

    (async () => {
      const { status, success, message } = await handleLogout();

      dispatch(resetUser());

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
