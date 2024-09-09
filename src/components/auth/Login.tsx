import AuthInput from './AuthInput';
import BaseButton from '../common/BaseButton';
import style from './styles/button.module.css';
import { useRouter } from 'next/navigation';
import { handleLogin } from './handlers/handleLogin';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../stores/reducer/modalRducer';

const Login = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={async event => {
        event.preventDefault();

        setDisabled(true);

        const { status, success, message } = await handleLogin(event);

        dispatch(
          setModal({
            title: success ? '로그인 성공' : '로그인 실패',
            success: success,
            message: message,
            modalIsShow: true,
            type: success ? 'confirm' : 'alert',
            path: '/',
          }),
        );

        setDisabled(false);
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
