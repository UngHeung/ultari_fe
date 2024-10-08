import defaultProfile from '@/public/images/profile_default.png';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RoleTypes, UserOptions } from '../../auth/interfaces/authInterface';
import {
  SliceOptions,
  UserState,
} from '../../stores/interfaces/stateInterface';
import SecretInfoItem from '../SecretInfoItem';
import style from '../styles/mypage.module.css';
import VerifyPasswordFormAndLinkedUpdateForm from './VerifyPasswordFormAndLinkedUpdateForm';

const MyPageDetail = () => {
  const user = useSelector((state: SliceOptions) => state.user);
  const { account, phone, email } = useSelector(
    (state: SliceOptions) => state.user,
  );

  const { name, role, profile, team }: UserState = user;

  const [passed, setPassed] = useState(account ? true : false);
  const [moreInformation, setMoreInformation] =
    useState<Pick<UserOptions, 'account' | 'phone' | 'email' | 'team'>>();

  return (
    <section className={style.userWrap}>
      <section className={style.profileWrap}>
        <Image
          src={profile?.startsWith('/') ? profile : defaultProfile}
          alt={'유저 프로필'}
          width={50}
          height={50}
        />
      </section>
      <section className={style.name}>
        <strong>{name}</strong>
        {'님'}
      </section>
      <section className={style.role}>
        {getRoleType(role || 'ROLE_USER')}
      </section>

      <section className={style.secretList}>
        <SecretInfoItem
          name={'아이디'}
          value={account || moreInformation?.account}
        />
        <SecretInfoItem
          name={'연락처'}
          value={phone || moreInformation?.phone}
        />
        <SecretInfoItem
          name={'이메일'}
          value={email || moreInformation?.email}
        />
        <SecretInfoItem
          name={'소속목장'}
          value={team?.name || moreInformation?.team?.name}
        />
      </section>

      <VerifyPasswordFormAndLinkedUpdateForm
        setMoreInformation={setMoreInformation}
        account={account}
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
