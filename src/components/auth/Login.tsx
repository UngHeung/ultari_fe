import React, { FormEvent, MouseEvent } from 'react';
import AuthInput from './AuthInput';
import BaseButton from '../common/BaseButton';
import style from './styles/button.module.css';

const Login = () => {
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      account: formData.get('account'),
      password: formData.get('password'),
      phone: formData.get('phone'),
      email: formData.get('email'),
    };

    console.log(data);
  };

  const handleSignUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('회원가입');
  };

  return (
    <form onSubmit={handleLogin}>
      <AuthInput
        name={'account'}
        id={'auth_account'}
        type={'text'}
        labelValue={'아이디'}
      />
      <AuthInput
        name={'password'}
        id={'auth_password'}
        type={'password'}
        labelValue={'비밀번호'}
      />
      <AuthInput
        name={'phone'}
        id={'auth_phone'}
        type={'text'}
        labelValue={'핸드폰번호'}
      />
      <AuthInput
        name={'email'}
        id={'auth_email'}
        type={'email'}
        labelValue={'이메일'}
      />

      <div className={style.buttonWrap}>
        <BaseButton type={'submit'} value={'로그인'} />
        <BaseButton type={'button'} value={'회원가입'} onClick={handleSignUp} />
      </div>
    </form>
  );
};

export default Login;
