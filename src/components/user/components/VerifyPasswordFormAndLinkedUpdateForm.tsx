import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import Link from 'next/link';
import { FormEvent, SetStateAction, useState } from 'react';
import handleMyInfo from '../../auth/handlers/handleMyInfo';
import { UserOptions } from '../../auth/interfaces/authInterface';
import { ModalState } from '../../stores/interfaces/stateInterface';
import PasswordInput from '../elements/PasswordInput';
import UserButton from '../elements/UserButton';
import { verifiedPassword } from '../handlers/verifiedPassword';
import style from '../styles/mypage.module.css';
import { validatePassword } from '../validators/passwordValidator';

const VerifyPasswordFormAndLinkedUpdateForm = ({
  setMoreInformation,
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
  const setUser = useUserStore((state: UserStore) => state.setUser);
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  const [disabled, setDisabled] = useState<boolean>(false);

  async function fetchMoreDataProcess(event: FormEvent<HTMLFormElement>) {
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
    const password = formData.get('password')?.toString() as string;

    const { success, message } = validatePassword(password);

    if (!success) {
      modalData.message = message;
      setModal(modalData);
      return false;
    }

    const response = await verifiedPassword({ password });

    if (!response?.success) {
      modalData.message = '비밀번호를 확인해주세요.';
      setModal(modalData);
      return false;
    }

    modalData.type = 'confirm';
    modalData.message = '정보를 성공적으로 불러왔습니다.';
    modalData.success = true;

    setModal(modalData);

    setPassed(true);

    const { data } = await handleMyInfo('team');

    setMoreInformation(data);

    setUser(data);
    setModal(modalData);
  }

  return (
    <form className={style.moreFetchDataFrom} onSubmit={fetchMoreDataProcess}>
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

export default VerifyPasswordFormAndLinkedUpdateForm;
