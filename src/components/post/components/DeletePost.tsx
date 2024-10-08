import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  ModalState,
  SliceOptions,
} from '../../stores/interfaces/stateInterface';
import { setModal } from '../../stores/reducer/modalRducer';
import handleDeletePost from '../handlers/handleDeletePost';

const DeletePost = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.user?.isLoggedIn ?? false,
  );

  async function postDeleteProcess() {
    const { success, message } = await handleDeletePost(postId);

    const secondModalData: ModalState = {
      title: success ? '게시물 삭제 성공' : '게시물 삭제 실패',
      type: success ? 'confirm' : 'alert',
      success,
      message,
      modalIsShow: true,
      routerType: 'replace',
      leftPath: '/post/list',
    };

    dispatch(setModal(secondModalData));
  }

  return <></>;
};

export default DeletePost;
