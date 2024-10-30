'use client';

import userAuthentication from '@/components/common/functions/userAuthentication';
import useTitleAndDescStore, {
  TitleAndDescriptionStore,
} from '@/components/stores/common/titleAndDescriptionStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './layout.module.css';

export type TeamPageType = 'list' | 'create';

const TeamLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const setTitle = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.setTitle,
  );
  const setDescription = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.setDescription,
  );
  const resetTitle = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.resetTitle,
  );
  const resetDescription = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.resetDescription,
  );
  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);

  useEffect(() => {
    const type: TeamPageType = pathname.slice(1).split('/')[1] as TeamPageType;

    if (!isLoggedIn && type === 'create') {
      userAuthentication(isLoggedIn, dispatch);
    }

    setTitle('목장모임');
    setDescription('함께 모여요.');

    return () => {
      resetTitle();
      resetDescription();
    };
  }, [pathname]);

  return (
    <>
      <section className={style.teamWrap}>{children}</section>
    </>
  );
};

export default TeamLayout;
