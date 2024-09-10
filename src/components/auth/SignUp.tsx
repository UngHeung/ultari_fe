import AuthInput from './elements/AuthInput';
import BaseButton from '../common/BaseButton';
import style from './styles/button.module.css';
import { useRouter } from 'next/navigation';
import { handleSignUp } from './handlers/handleSignUp';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../stores/reducer/modalRducer';

const SignUp = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <>
      <form
        onSubmit={async event => {
          event.preventDefault();

          setDisabled(true);

          const { status, success, message } = await handleSignUp(event);

          dispatch(
            setModal({
              title: success ? '가입 성공' : '가입 실패',
              success: success,
              message: message,
              modalIsShow: true,
              type: success ? 'confirm' : 'alert',
              path: '/login',
            }),
          );

          // success && router.replace('/login');
          setDisabled(false);
        }}
      >
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
          description={''}
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
      </form>
    </>
  );
};

export default SignUp;
