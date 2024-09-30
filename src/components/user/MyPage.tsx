import defaultProfile from '@/public/images/profile_default.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleGetMyInfo from '../auth/handlers/handleGetMyInfo';
import { RoleTypes, UserOptions } from '../auth/interfaces/authInterface';
import {
  ModalState,
  SliceOptions,
  UserState,
} from '../stores/interfaces/stateInterface';
import { setModal } from '../stores/reducer/modalRducer';
import { setUser } from '../stores/reducer/userReducer';
import SecretInfoItem from './SecretInfoItem';
import style from './styles/mypage.module.css';

const MyPage = ({ user }: { user: UserState }) => {
  const dispatch = useDispatch();

  const { account, phone, email } = useSelector(
    (state: SliceOptions) => state.user,
  );

  const { name, role, profile, team }: UserState = user;
  const [disabled, setDisabled] = useState<boolean>(false);
  const [moreInformation, setMoreInformation] =
    useState<Pick<UserOptions, 'account' | 'phone' | 'email' | 'team'>>();

  async function handleMoreFetchData() {
    const { status, message, success, data } = await handleGetMyInfo('team');

    setDisabled(true);

    setMoreInformation(data);

    dispatch(setUser(data));

    const modalData: ModalState = {
      type: success ? 'confirm' : 'alert',
      message: success ? '정보를 불러왔습니다.' : '정보를 불러오지 못했습니다.',
      success,
      routerType: undefined,
      modalIsShow: true,
    };

    dispatch(setModal(modalData));
  }

  useEffect(() => {
    if (account) {
      setDisabled(true);
    }
  }, []);

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

      <section className={style.moreFetchDataFrom}>
        {!disabled ? (
          <button
            disabled={disabled}
            type="button"
            onClick={handleMoreFetchData}
          >
            내 정보 더보기
          </button>
        ) : (
          <Link href={'/user/update'}>내 정보 수정</Link>
        )}
      </section>
    </section>
  );
};

export default MyPage;

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
