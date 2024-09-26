'use client';

import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './layout.module.css';

const TeamLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state?.user?.isLoggedIn ?? false,
  );

  useEffect(() => {
    const type = pathname.slice(1);

    if (type === 'create') {
      !isLoggedIn ? setTitle('목장 만들기') : router.replace('/');
    } else if (type === '') {
      //
    }
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

export default TeamLayout;
