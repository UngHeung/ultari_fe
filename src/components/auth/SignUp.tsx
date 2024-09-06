import React, { FormEvent, MouseEvent } from 'react';
import AuthInput from './AuthInput';
import BaseButton from '../common/BaseButton';
import style from './styles/button.module.css';

const SignUp = () => {
  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
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

  const handleButton = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log('이전 페이지로 이동');
  };

  return (
    <form onSubmit={handleSignUp}>
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
        <BaseButton type={'submit'} value={'가입하기'} />
        <BaseButton type={'button'} value={'취소'} onClick={handleButton} />
      </div>
    </form>
  );
};

export default SignUp;
