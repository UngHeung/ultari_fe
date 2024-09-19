import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import BaseButton from '../common/BaseButton';
import AuthInput from './elements/AuthInput';
import { handleSubmit } from './handlers/handleSubmitLogin';
import style from './styles/button.module.css';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <form onSubmit={event => handleSubmit(event, dispatch, setDisabled)}>
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
          disabled={disabled}
        />

        <BaseButton
          styleClass={style.authButton}
          type={'button'}
          value={'회원가입'}
          disabled={disabled}
          onClick={() => router.push('/sign')}
        />
      </div>
    </form>
  );
};

export default Login;
