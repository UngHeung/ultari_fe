import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { ModalStoreOptions } from '@/components/stores/modal/modalStore';
import { MouseEvent } from 'react';

function userAuthentication(
  isLoggedIn: boolean,
  setModal: (modal: ModalStoreOptions) => void,
  event?: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>,
) {
  if (!isLoggedIn) {
    event?.preventDefault();

    const ModalData: ModalState = {
      title: '로그인',
      type: event ? 'prompt' : 'alert',
      message: `로그인이 필요한 페이지입니다.\n확인시 로그인 페이지로 이동합니다.`,
      success: false,
      routerType: 'push',
      modalIsShow: true,
      leftPath: '/login',
    };

    setModal(ModalData);
  }
}

export default userAuthentication;
