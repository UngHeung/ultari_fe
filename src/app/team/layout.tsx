'use client';

import userAuthentication from '@/components/common/functions/userAuthentication';
import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './layout.module.css';

export type TeamPageType = 'list' | 'create';

const TeamLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.logged.isLoggedIn,
  );

  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const type: TeamPageType = pathname.slice(1).split('/')[1] as TeamPageType;

    if (!isLoggedIn && type === 'create') {
      userAuthentication(isLoggedIn, dispatch);
    }

    if (type === 'list') {
      setTitle('목장 목록');
    } else if (type === 'create') {
      setTitle('목장 생성');
    } else {
      setTitle('목장');
    }

    return () => {};
  }, [pathname]);

  return (
    <>
      <section className={style.teamWrap}>
        <h2 className={style.teamTitle}>{title}</h2>
        {children}
      </section>
    </>
  );
};

export default TeamLayout;
