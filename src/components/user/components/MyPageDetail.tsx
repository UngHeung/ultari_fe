import {
  defaultProfile,
  profilePath,
} from '@/components/common/constants/pathConst';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RoleTypes, UserOptions } from '../../auth/interfaces/authInterface';
import { SliceOptions } from '../../stores/interfaces/stateInterface';
import SecretInfoItem from '../SecretInfoItem';
import style from '../styles/mypage.module.css';
import VerifyPasswordFormAndLinkedUpdateForm from './VerifyPasswordFormAndLinkedUpdateForm';

const MyPageDetail = () => {
  const user = useSelector((state: SliceOptions) => state.user);

  const [passed, setPassed] = useState(user.account ? true : false);
  const [moreInformation, setMoreInformation] =
    useState<
      Pick<UserOptions, 'account' | 'phone' | 'email' | 'team' | 'community'>
    >();

  return (
    <section className={style.userWrap}>
      <section className={style.profileWrap}>
        <Image
          src={
            user.profile?.path
              ? `${profilePath}/${user.profile?.path}`
              : defaultProfile
          }
          alt={'유저 프로필'}
          width={50}
          height={50}
          sizes={'100%'}
        />
      </section>
      <section className={style.name}>
        <strong>{user.name}</strong>
        {'님'}
      </section>
      <section className={style.role}>
        {getRoleType(user.role || 'ROLE_USER')}
      </section>

      <section className={style.secretList}>
        <SecretInfoItem
          name={'아이디'}
          value={user.account ?? moreInformation?.account}
        />
        <SecretInfoItem
          name={'연락처'}
          value={passed ? (user.phone ?? moreInformation?.phone) : ''}
        />
        <SecretInfoItem
          name={'이메일'}
          value={passed ? (user.email ?? moreInformation?.email) : ''}
        />
        <SecretInfoItem
          name={'목장'}
          value={
            passed
              ? (user.team?.name ??
                moreInformation?.team?.name ??
                '소속 목장이 없습니다.')
              : ''
          }
        />
        <SecretInfoItem
          name={'소속'}
          value={passed ? user.community || moreInformation?.community : ''}
        />
      </section>

      <VerifyPasswordFormAndLinkedUpdateForm
        setMoreInformation={setMoreInformation}
        account={user.account}
        setPassed={setPassed}
        passed={passed}
      />
    </section>
  );
};

export default MyPageDetail;

export function getRoleType(type: RoleTypes) {
  if (type === 'ROLE_ADMIN') {
    return '관리자';
  } else if (type === 'ROLE_SHEEP') {
    return '목장원';
  } else if (type === 'ROLE_SHEPHERD') {
    return '목자';
  } else {
    return '일반회원';
  }
}
