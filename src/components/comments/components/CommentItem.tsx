import { authAxios } from '@/apis/axiosInstance';
import getDate from '@/components/common/functions/getDate';
import getLastModifiedDate from '@/components/common/functions/getLastModifiedDate';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { CommentOptions } from '@/components/post/interfaces/postInterfaces';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import UserProfile from '@/components/user/components/UserProfile';
import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from '../styles/comment.module.css';
import CommentWriteForm from './CommentWriteForm';

const CommentItem = ({
  comment,
  setCommentList,
}: {
  comment: CommentOptions;
  setCommentList: React.Dispatch<SetStateAction<CommentOptions[]>>;
}) => {
  const dispatch = useDispatch();

  const [isModify, setIsModify] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { title, date } = getLastModifiedDate(
    getDate(comment.createAt),
    getDate(comment.updateAt),
  );

  async function deleteCommentProcess() {
    setDisabled(true);

    const { message, success, data } = await handleDeleteComment(comment.id);

    if (success) {
      setCommentList(prevList =>
        prevList.filter(item => item.id !== comment.id),
      );
    }

    const modalData: ModalState = {
      type: 'confirm',
      success,
      message,
      routerType: undefined,
      modalIsShow: true,
    };

    dispatch(setModal(modalData));

    setDisabled(false);
  }

  async function handleDeleteComment(id: number) {
    try {
      const response = await authAxios.delete(`/post/${id}/comment`);

      return makeResponseResult(response, '댓글삭제');
    } catch (error: any) {
      return makeResponseResult(error);
    }
  }

  return (
    <li className={style.commentItem}>
      <div className={style.userInfoWrap}>
        <UserProfile path={comment.writer.profile?.path} size={25} />
        <strong>{comment.writer.name}</strong>
      </div>
      <div className={style.contentWrap}>
        <pre>{comment.content}</pre>
      </div>
      <div className={style.dateWrap}>
        <span>{title}</span>
        <span>{date}</span>
      </div>
      <button
        disabled={disabled}
        type="button"
        onClick={() => setIsModify(prev => !prev)}
      >
        수정
      </button>
      <button disabled={disabled} type="button" onClick={deleteCommentProcess}>
        삭제
      </button>
      {isModify && (
        <CommentWriteForm type={'update'} setCommentList={setCommentList} />
      )}
    </li>
  );
};

export default CommentItem;
