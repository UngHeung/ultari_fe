import { useDispatch } from 'react-redux';
import showModal from '../../common/functions/showModal';
import { ModalState } from '../../stores/interfaces/stateInterface';
import { resetUser } from '../../stores/reducer/userReducer';
import handleLogout from '../handlers/handleLogout';

const Logout = () => {
  const dispatch = useDispatch();

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

    showModal(dispatch, modalData);
  }

  logoutProcess();

  return <></>;
};

export default Logout;
