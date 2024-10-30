import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ModalState } from '../../stores/interfaces/stateInterface';
import handleDeletePost from '../handlers/handleDeletePost';

const DeletePost = () => {
  const pathname = usePathname();
  const postId = +pathname.split('/')[3];

  const setModal = useModalStore((state: ModalStore) => state.setModal);

  useEffect(() => {
    postDeleteProcess();
  }, []);

  async function postDeleteProcess() {
    const { success, message } = await handleDeletePost(postId);

    const modalData: ModalState = {
      title: success ? '게시물 삭제 성공' : '게시물 삭제 실패',
      type: success ? 'confirm' : 'alert',
      success,
      message,
      modalIsShow: true,
      routerType: 'replace',
      leftPath: '/post/list',
    };

    setModal(modalData);
  }

  return <></>;
};

export default DeletePost;
