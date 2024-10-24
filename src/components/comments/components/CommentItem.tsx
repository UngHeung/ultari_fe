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
import CommentButton from '../elements/CommentButton';
import style from '../styles/comment.module.css';
import CommentWriteForm from './CommentWriteForm';

const CommentItem = ({
  comment,
  setCommentList,
  userId,
}: {
  comment: CommentOptions;
  setCommentList: React.Dispatch<SetStateAction<CommentOptions[]>>;
  userId?: number;
}) => {
  const dispatch = useDispatch();

  const [isModify, setIsModify] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { title, date } = getLastModifiedDate(
    getDate(comment.createAt),
    getDate(comment.updateAt),
  );
  const [day, time] = date.split(' ');

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
      const response = await authAxios.delete(`/post/comment/${id}`);

      return makeResponseResult(response, '댓글삭제');
    } catch (error: any) {
      return makeResponseResult(error);
    }
  }

  return (
    <li className={style.commentItem}>
      <section className={style.userInfoWrap}>
        <UserProfile path={comment.writer?.profile?.path} size={25} />
        <strong>{comment.writer?.name}</strong>
      </section>
      <section className={style.contentWrap}>
        <pre>{comment.content}</pre>
      </section>
      <section className={style.dateWrap}>
        <span>{title}</span>
        <span>{day}</span>
        <span>{time}</span>
      </section>

      {userId && comment.writer.id === userId && (
        <section className={style.buttonWrap}>
          <CommentButton
            disabled={disabled}
            type={'button'}
            value={'수정'}
            onClick={() => setIsModify(prev => !prev)}
          />
          <CommentButton
            disabled={disabled}
            type={'button'}
            value={'삭제'}
            onClick={deleteCommentProcess}
          />
        </section>
      )}
      {isModify && (
        <CommentWriteForm
          type={'update'}
          setCommentList={setCommentList}
          setIsModify={setIsModify}
          id={comment.id}
        />
      )}
    </li>
  );
};

export default CommentItem;
