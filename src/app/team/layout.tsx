'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './layout.module.css';

export type TeamPageType = 'list' | 'create';

const TeamLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const type: TeamPageType = pathname.slice(1).split('/')[1] as TeamPageType;

    setTitle(getTitle(type));

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

function getTitle(type: 'list' | 'create') {
  if (type === 'list') {
    return '목장 목록';
  } else if (type === 'create') {
    return '목장 생성';
  } else {
    return '목장';
  }
}

export default TeamLayout;
