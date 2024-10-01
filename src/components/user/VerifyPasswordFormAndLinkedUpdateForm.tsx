import { authAxios } from '@/apis/axiosAuth';
import Link from 'next/link';
import { FormEvent, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import handleGetMyInfo from '../auth/handlers/handleGetMyInfo';
import { UserOptions } from '../auth/interfaces/authInterface';
import { BASE_URL } from '../common/constants/pathConst';
import { ModalState } from '../stores/interfaces/stateInterface';
import { setModal } from '../stores/reducer/modalRducer';
import { setUser } from '../stores/reducer/userReducer';
import PasswordInput from './elements/PasswordInput';
import UserButton from './elements/UserButton';
import style from './styles/mypage.module.css';

const VerifyPasswordFormAndLinkedUpdateForm = ({
  setMoreInformation,
  account,
  setPassed,
  passed,
}: {
  setMoreInformation: React.Dispatch<
    SetStateAction<
      Pick<UserOptions, 'account' | 'phone' | 'email' | 'team'> | undefined
    >
  >;
  setPassed: React.Dispatch<SetStateAction<boolean>>;
  passed: boolean;
  account?: string;
}) => {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState<boolean>(false);

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

    if (!password.length) {
      modalData.message = '비밀번호를 입력해주세요.';
      dispatch(setModal(modalData));
      return;
    }

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

  return (
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
          <UserButton
            className={style.moreFetchButton}
            disabled={disabled}
            type={'submit'}
            value={'내 정보 더보기'}
          />
        </div>
      ) : (
        <Link href={'/user/update'}>내 정보 수정</Link>
      )}
    </form>
  );
};

export async function verifiedPassword(password: string) {
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

export default VerifyPasswordFormAndLinkedUpdateForm;