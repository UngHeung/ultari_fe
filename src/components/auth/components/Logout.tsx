import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import useProfileStore, {
  ProfileStore,
} from '@/components/stores/user/profileStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import { useEffect } from 'react';
import { ModalState } from '../../stores/interfaces/stateInterface';
import handleLogout from '../handlers/handleLogout';

const Logout = () => {
  const resetIsLoggedIn = useLoggedStore(
    (state: LoggedStore) => state.resetIsLoggedIn,
  );
  const resetUser = useUserStore((state: UserStore) => state.resetUser);
  const resetProfile = useProfileStore(
    (state: ProfileStore) => state.resetPath,
  );
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  useEffect(() => {
    logoutProcess();
  }, []);

  async function logoutProcess() {
    const { success, message } = await handleLogout();

    const modalData: ModalState = {
      title: '로그아웃',
      success: success,
      message: message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: 'replace',
      leftPath: '/',
    };

    resetUser();
    resetProfile();
    resetIsLoggedIn();

    localStorage.clear();

    setModal(modalData);
  }

  return <></>;
};

export default Logout;
