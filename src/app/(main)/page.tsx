'use client';

import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.logged.isLoggedIn,
  );
  const user = useSelector((state: SliceOptions) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if (user.team) {
        router.replace(`/team/detail/${user.team.id}`);
      } else {
        router.replace(`/team/list`);
      }
    } else {
      router.replace('/post/list');
    }
  }, []);

  return <>호미다</>;
}
