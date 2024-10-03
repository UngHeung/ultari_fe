'use client';

import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import MyPage from '@/components/user/MyPage';
import { useSelector } from 'react-redux';

const myPage = () => {
  const user = useSelector((state: SliceOptions) => state.user);

  return <MyPage user={user} />;
};

export default myPage;
