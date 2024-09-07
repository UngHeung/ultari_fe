import React, { FormEvent, MouseEvent } from 'react';
import AuthInput from './AuthInput';
import BaseButton from '../common/BaseButton';
import style from './styles/button.module.css';

const Login = () => {
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      account: formData.get('account'),
      password: formData.get('password'),
    };

    console.log(data);
  };

  const handleButton = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log('회원가입으로 이동');
  };

  return (
    <form onSubmit={handleLogin}>
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
        <BaseButton type={'submit'} value={'로그인'} />
        <BaseButton type={'button'} value={'회원가입'} onClick={handleButton} />
      </div>
    </form>
  );
};

export default Login;
