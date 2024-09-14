import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import BaseButton from '../common/BaseButton';
import { showModal } from '../common/functions/showModal';
import { ModalState } from '../stores/reducer/modalRducer';
import { setUser } from '../stores/reducer/userReducer';
import AuthInput from './elements/AuthInput';
import { getMyInfo } from './functions/getMyInfo';
import { handleLogin } from './handlers/handleLogin';
import style from './styles/button.module.css';

const Login = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={async event => {
        event.preventDefault();

        setDisabled(true);

        const { success, message } = await handleLogin(event);

        if (success) {
          const { data } = await getMyInfo();

          dispatch(
            setUser({
              ...data,
              isLoggedIn: true,
            }),
          );

          localStorage.setItem(
            'myInfo',
            JSON.stringify({ ...data, isLoggedIn: true }),
          );
        }

        const modalData: ModalState = {
          title: success ? '로그인 성공' : '로그인 실패',
          success,
          message,
          modalIsShow: true,
          type: success ? 'confirm' : 'alert',
          path: success ? '/back' : '',
        };

        showModal(dispatch, modalData);
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
