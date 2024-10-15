import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ModalState } from '../../stores/interfaces/stateInterface';
import { setModal } from '../../stores/reducer/modalRducer';
import handleDeletePost from '../handlers/handleDeletePost';

const DeletePost = ({ postId }: { postId: number }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

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

    dispatch(setModal(modalData));
  }

  return <></>;
};

export default DeletePost;
