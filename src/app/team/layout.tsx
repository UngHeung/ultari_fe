'use client';

import { checkAuth } from '@/components/auth/functions/checkAuth';
import {
  ModalState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './layout.module.css';

export type TeamPageType = 'list' | 'create';

const TeamLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state?.user?.isLoggedIn ?? false,
  );

  useEffect(() => {
    const type: TeamPageType = pathname.slice(1).split('/')[1] as TeamPageType;

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
      <section className={style.teamWrap}>
        <h2 className={style.teamTitle}>{title}</h2>
        {children}
      </section>
    </>
  );
};

function getTitle(type: 'list' | 'create', isLoggedIn: boolean) {
  if (type === 'list') {
    return '목장 목록';
  } else if (type === 'create') {
    return '목장 생성';
  } else {
    return '목장';
  }
}

export default TeamLayout;
