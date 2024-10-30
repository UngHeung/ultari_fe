import BaseButton from '@/components/common/elements/BaseButton';
import mapModalMessage from '@/components/common/functions/mapModalMessage';
import useModalStore, {
  ModalStore,
  ModalStoreOptions,
} from '@/components/stores/modal/modalStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import useProfileStore, {
  ProfileStore,
} from '@/components/stores/user/profileStore';
import useUserStore, {
  UserStore,
  UserStoreOption,
} from '@/components/stores/user/userStore';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import AuthInput from '../elements/AuthInput';
import getUserDataFromToken from '../functions/getUserDataFromToken';
import handleLogin from '../handlers/handleLogin';
import style from '../styles/button.module.css';

const Login = () => {
  const router = useRouter();

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const setIsLoggedIn = useLoggedStore(
    (state: LoggedStore) => state.setIsLoggedIn,
  );
  const setUser = useUserStore((state: UserStore) => state.setUser);
  const setProfile = useProfileStore((state: ProfileStore) => state.setPath);
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  const [disabled, setDisabled] = useState<boolean>(false);

  async function loginProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const { success, message } = await handleLogin(event);

    if (success) {
      const userData: UserStoreOption = getUserDataFromToken();

      setUser(userData);
      setProfile(userData.path ?? '');
      setIsLoggedIn(true);
    }

    const modalData: ModalStoreOptions = {
      title: '로그인',
      success,
      message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: success ? 'back' : undefined,
    };

    modalData.message = mapModalMessage(modalData);

    setModal(modalData);
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
