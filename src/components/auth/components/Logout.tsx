import useLoggedStore, { LoggedStore } from '@/components/stores/loggedStore';
import { setModal } from '@/components/stores/reducer/modalRducer';
import useProfileStore, {
  ProfileStore,
} from '@/components/stores/user/profileStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ModalState } from '../../stores/interfaces/stateInterface';
import handleLogout from '../handlers/handleLogout';

const Logout = () => {
  const dispatch = useDispatch();

  const resetIsLoggedIn = useLoggedStore(
    (state: LoggedStore) => state.resetIsLoggedIn,
  );
  const resetUser = useUserStore((state: UserStore) => state.resetUser);
  const resetProfile = useProfileStore(
    (state: ProfileStore) => state.resetPath,
  );

  useEffect(() => {
    logoutProcess();
  }, []);

  async function logoutProcess() {
    const { success, message } = await handleLogout();

    resetUser();
    resetProfile();

    const modalData: ModalState = {
      title: '로그아웃',
      success: success,
      message: message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: 'replace',
      leftPath: '/',
    };

    resetIsLoggedIn();

    dispatch(setModal(modalData));
  }

  return <></>;
};

export default Logout;
