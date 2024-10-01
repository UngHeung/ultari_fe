import defaultProfile from '@/public/images/profile_default.png';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
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
import PasswordInput from './elements/PasswordInput';
import SecretInfoItem from './SecretInfoItem';
import style from './styles/mypage.module.css';
import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '../common/constants/pathConst';

async function verifiedPassword(password: string) {
  const data = { password };
  const url = `${BASE_URL}/auth/verify`;
  try {
    const response = await authAxios.post(url, data);

    return {
      status: response.status,
      success: true,
    };
  } catch (error: any) {
    return {
      status: error.status,
      success: false,
    };
  }
}

const MyPage = ({ user }: { user: UserState }) => {
  const dispatch = useDispatch();

  const { account, phone, email } = useSelector(
    (state: SliceOptions) => state.user,
  );

  const { name, role, profile, team }: UserState = user;
  const [disabled, setDisabled] = useState<boolean>(false);
  const [passed, setPassed] = useState<boolean>(false);
  const [moreInformation, setMoreInformation] =
    useState<Pick<UserOptions, 'account' | 'phone' | 'email' | 'team'>>();

  async function handleMoreFetchData(
    event: FormEvent<HTMLFormElement>,
    account: string,
  ) {
    event.preventDefault();

    setDisabled(false);

    const modalData: ModalState = {
      type: 'alert',
      message: '',
      success: false,
      routerType: undefined,
      modalIsShow: true,
    };

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password')?.toString() || '';
    const response = await verifiedPassword(password);

    if (!response.success) {
      modalData.message = '비밀번호를 확인해주세요.';
      dispatch(setModal(modalData));
      return;
    }

    modalData.type = 'confirm';
    modalData.message = '정보를 성공적으로 불러왓습니다.';
    modalData.success = true;

    dispatch(setModal(modalData));

    setPassed(true);

    const { status, message, success, data } = await handleGetMyInfo('team');

    setMoreInformation(data);

    dispatch(setUser(data));
    dispatch(setModal(modalData));
  }

  useEffect(() => {
    if (account) {
      setPassed(true);
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

      <form
        className={style.moreFetchDataFrom}
        onSubmit={event => handleMoreFetchData(event, account ?? '')}
      >
        {!passed ? (
          <div>
            <PasswordInput
              className={style.passwordInput}
              placeholder={'비밀번호 입력 후'}
              name={'password'}
            />
            <button
              className={style.moreFetchButton}
              disabled={disabled}
              type={'submit'}
            >
              내 정보 더보기
            </button>
          </div>
        ) : (
          <Link href={'/user/update'}>내 정보 수정</Link>
        )}
      </form>
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
