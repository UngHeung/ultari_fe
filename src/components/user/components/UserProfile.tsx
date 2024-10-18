'use client';

import {
  defaultProfile,
  profilePath,
} from '@/components/common/constants/pathConst';
import Image from 'next/image';
import style from '../styles/profile.module.css';

const UserProfile = ({ path, size }: { path?: string; size?: number }) => {
  let prefix;
  if (path?.startsWith('blob')) {
    prefix = '';
  } else {
    prefix = `${profilePath}/`;
  }

  return (
    <span className={style.profileWrap} style={{ widows: size, height: size }}>
      <Image
        src={path ? `${prefix}${path}` : defaultProfile}
        alt={'유저 프로필'}
        width={size ?? 50}
        height={size ?? 50}
        sizes={'100%'}
      />
    </span>
  );
};

export default UserProfile;
