'use client';

import {
  ModalState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './layout.module.css';
import { setModal } from '@/components/stores/reducer/modalRducer';

export type UserPageType = 'my' | 'list';

const TeamLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state?.user?.isLoggedIn ?? false,
  );

  useEffect(() => {
    const type: UserPageType = pathname.slice(1).split('/')[1] as UserPageType;

    setTitle(getTitle(type, isLoggedIn));

    if (!checkAuth(type, isLoggedIn)) {
      const modalData: ModalState = {
        title: '권한 없음',
        type: 'alert',
        success: false,
        message: '로그인 후 사용 가능합니다.',
        modalIsShow: true,
        routerType: 'push',
        leftPath: '/login',
      };

      dispatch(setModal(modalData));
    }

    return () => {};
  }, [pathname, isLoggedIn]);

  return (
    <>
      <section className={style.userWrap}>
        <h2 className={style.userTitle}>{title}</h2>
        {children}
      </section>
    </>
  );
};

function getTitle(type: UserPageType, isLoggedIn: boolean) {
  if (type === 'my') {
    return '마이페이지';
  } else if (type === 'list') {
    return '유저 목록';
  } else {
    return '목장';
  }
}

export function checkAuth(type: UserPageType, isLoggedIn: boolean) {
  if ((!isLoggedIn && type === 'my') || (!isLoggedIn && type === 'list')) {
    return false;
  }

  return true;
}

export default TeamLayout;