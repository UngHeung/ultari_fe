'use client';

import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import UpdateInfo from '@/components/user/UpdateInfo';
import { useSelector } from 'react-redux';

const UpdatePage = () => {
  const user = useSelector((state: SliceOptions) => state.user);

  return (
    <>
      <UpdateInfo user={user} />
    </>
  );
};

export default UpdatePage;
