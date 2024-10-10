import { useDispatch } from 'react-redux';
import { ModalState } from '../../stores/interfaces/stateInterface';
import { resetUser } from '../../stores/reducer/userReducer';
import handleLogout from '../handlers/handleLogout';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { useEffect } from 'react';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    logoutProcess();
  }, []);

  async function logoutProcess() {
    const { success, message } = await handleLogout();

    dispatch(resetUser());

    const modalData: ModalState = {
      title: success ? '로그아웃 성공' : '로그아웃 실패',
      success: success,
      message: message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: 'replace',
      leftPath: '/',
    };

    dispatch(setModal(modalData));
  }

  return <></>;
};

export default Logout;
