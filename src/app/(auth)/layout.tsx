'use client';

import {
  ModalState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './layout.module.css';
import useLoggedStore, { LoggedStore } from '@/components/stores/loggedStore';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);

  useEffect(() => {
    const type = pathname.slice(1);

    if (isLoggedIn) {
      const ModalData: ModalState = {
        title: '잘못된접근',
        type: 'alert',
        message: `잘못된 접근입니다.`,
        success: false,
        routerType: 'replace',
        modalIsShow: true,
        leftPath: '/',
      };

      dispatch(setModal(ModalData));
    }

    if (type === 'sign') {
      setTitle('회원 가입');
    } else if (type === 'login') {
      setTitle('로그인');
    } else if (type === 'forgot/account') {
      setTitle('아이디 찾기');
    } else if (type === 'forgot/password') {
      setTitle('비밀번호 찾기');
    }
  }, [pathname]);

  return (
    <>
      <section className={style.authWrap}>
        <h2 className={style.authTitle}>{title}</h2>
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
