'use client';

import AuthInput from './AuthInput';
import BaseButton from '../common/BaseButton';
import style from './styles/button.module.css';
import { useRouter } from 'next/navigation';
import { handleLogin } from './handlers/handleLogin';

const Login = () => {
  const router = useRouter();

  return (
    <form
      onSubmit={async event => {
        const { success, message } = await handleLogin(event);
        success && router.replace('/');
      }}
    >
      <AuthInput
        name={'account'}
        id={'login_account'}
        type={'text'}
        labelValue={'아이디'}
        placeholder={' '}
      />
      <AuthInput
        name={'password'}
        id={'login_password'}
        type={'password'}
        labelValue={'비밀번호'}
        placeholder={' '}
      />

      <div className={style.buttonWrap}>
        <BaseButton
          styleClass={style.authButton}
          type={'submit'}
          value={'로그인'}
        />
        <BaseButton
          styleClass={style.authButton}
          type={'button'}
          value={'회원가입'}
          onClick={() => router.push('/sign')}
        />
      </div>
    </form>
  );
};

export default Login;
