import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import Link from 'next/link';
import { useState } from 'react';
import { RoleTypes, UserOptions } from '../../auth/interfaces/authInterface';
import SecretInfoItem from '../SecretInfoItem';
import style from '../styles/mypage.module.css';
import UserProfile from './UserProfile';
import VerifyPasswordFormAndLinkedUpdateForm from './VerifyPasswordFormAndLinkedUpdateForm';
import useProfileStore, {
  ProfileStore,
} from '@/components/stores/user/profileStore';

const MyPageDetail = () => {
  const user = useUserStore((state: UserStore) => state.user);
  const profile = useProfileStore((state: ProfileStore) => state.path);

  const [passed, setPassed] = useState(user.account ? true : false);
  const [moreInformation, setMoreInformation] =
    useState<
      Pick<UserOptions, 'account' | 'phone' | 'email' | 'team' | 'community'>
    >();

  return (
    <section className={style.userWrap}>
      <section className={style.profileWrap}>
        <UserProfile path={profile} />
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
      <Link href={'/logout'}>로그아웃</Link>
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
