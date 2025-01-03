import BaseButton from '@/components/common/elements/BaseButton';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ModalState } from '../../stores/interfaces/stateInterface';
import AuthInput from '../elements/AuthInput';
import { handleSignUp } from '../handlers/handleSignUp';
import style from '../styles/button.module.css';

const SignUp = () => {
  const router = useRouter();

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  const [disabled, setDisabled] = useState<boolean>(false);

  async function signUpProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const { success, message } = await handleSignUp(event);

    const modalData: ModalState = {
      title: success ? '가입 성공' : '가입 실패',
      success: success,
      message: message,
      modalIsShow: true,
      routerType: 'replace',
      type: success ? 'confirm' : 'alert',
      leftPath: success ? '/login' : '',
    };

    setModal(modalData);

    setDisabled(false);
  }

  return (
    <>
      <form onSubmit={signUpProcess}>
        {!isLoggedIn && (
          <>
            <AuthInput
              name={'account'}
              id={'auth_account'}
              type={'text'}
              labelValue={'아이디'}
              placeholder={' '}
              description={'6 ~ 15자, 영문 소문자, 숫자'}
            />
            <AuthInput
              name={'password'}
              id={'auth_password'}
              type={'password'}
              labelValue={'비밀번호'}
              placeholder={' '}
              description={'8 ~ 20자, 영문 대소문자, 숫자, 특수문자 포함'}
            />
            <AuthInput
              name={'checkPassword'}
              id={'auth_password_check'}
              type={'password'}
              labelValue={'비밀번호 확인'}
              placeholder={' '}
              description={'비밀번호 확인'}
            />
            <AuthInput
              name={'name'}
              id={'auth_name'}
              type={'text'}
              labelValue={'이름'}
              placeholder={' '}
              description={'2 ~ 10자, 영문, 한글'}
            />
            <AuthInput
              name={'phone'}
              id={'auth_phone'}
              type={'text'}
              labelValue={'핸드폰번호'}
              placeholder={' '}
              description={'000-000-0000, 000-0000-0000'}
            />
            <AuthInput
              name={'email'}
              id={'auth_email'}
              type={'email'}
              labelValue={'이메일'}
              placeholder={' '}
              description={'XXX@XXX.XXX'}
            />
            <AuthInput
              name={'community'}
              id={'auth_community'}
              type={'text'}
              labelValue={'소속'}
              placeholder={' '}
              description={'소속 교회 또는 소속 학교 등'}
            />

            <div className={style.buttonWrap}>
              <BaseButton
                styleClass={style.authButton}
                type={'submit'}
                value={'가입하기'}
                disabled={disabled}
              />
              <BaseButton
                styleClass={style.authButton}
                type={'button'}
                value={'취소'}
                disabled={disabled}
                onClick={() => router.back()}
              />
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default SignUp;
