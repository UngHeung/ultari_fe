'use client';

import userAuthentication from '@/components/common/functions/userAuthentication';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './layout.module.css';

export type UserPageType = 'my' | 'list';

const TeamLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>('');

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  useEffect(() => {
    const type: UserPageType = pathname.slice(1).split('/')[1] as UserPageType;

    setTitle(getTitle(type));

    userAuthentication(isLoggedIn, setModal);

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

function getTitle(type: UserPageType) {
  if (type === 'my') {
    return '마이페이지';
  } else if (type === 'list') {
    return '유저 목록';
  } else {
    return '목장';
  }
}

export default TeamLayout;
