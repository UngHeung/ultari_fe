'use client';

import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import MyPageDetail from '@/components/user/MyPageDetail';
import { useSelector } from 'react-redux';

const MyPage = () => {
  const user = useSelector((state: SliceOptions) => state.user);

  return <MyPageDetail user={user} />;
};

export default MyPage;
