'use client';

import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const user = useUserStore((state: UserStore) => state.user);
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

  return <>홈입니다.</>;
}
