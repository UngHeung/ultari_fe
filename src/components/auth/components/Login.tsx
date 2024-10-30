import BaseButton from '@/components/common/elements/BaseButton';
import mapModalMessage from '@/components/common/functions/mapModalMessage';
import { setLogged } from '@/components/stores/reducer/loggedReducer';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ModalState,
  SliceOptions,
  UserState,
} from '../../stores/interfaces/stateInterface';
import { setUser } from '../../stores/reducer/userReducer';
import AuthInput from '../elements/AuthInput';
import getUserDataFromToken from '../functions/getUserDataFromToken';
import handleLogin from '../handlers/handleLogin';
import style from '../styles/button.module.css';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.logged.isLoggedIn,
  );

  const [disabled, setDisabled] = useState<boolean>(false);

  async function loginProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const { success, message } = await handleLogin(event);

    if (success) {
      const userData: UserState = getUserDataFromToken();

      dispatch(setUser(userData));
      dispatch(setLogged({ isLoggedIn: true }));
    }

    const modalData: ModalState = {
      title: '로그인',
      success,
      message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: success ? 'back' : undefined,
    };

    modalData.message = mapModalMessage(modalData);

    dispatch(setModal(modalData));
    setDisabled(false);
  }

  return (
    <form onSubmit={event => loginProcess(event)}>
      {!isLoggedIn && (
        <>
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
        </>
      )}
    </form>
  );
};

export default Login;
