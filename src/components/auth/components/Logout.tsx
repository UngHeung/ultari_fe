import { resetLogged } from '@/components/stores/reducer/loggedReducer';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ModalState } from '../../stores/interfaces/stateInterface';
import { resetUser } from '../../stores/reducer/userReducer';
import handleLogout from '../handlers/handleLogout';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    logoutProcess();
  }, []);

  async function logoutProcess() {
    const { success, message } = await handleLogout();

    dispatch(resetUser());

    const modalData: ModalState = {
      title: '로그아웃',
      success: success,
      message: message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: 'replace',
      leftPath: '/',
    };

    dispatch(resetLogged());

    dispatch(setModal(modalData));
  }

  return <></>;
};

export default Logout;
