import { authAxios } from '@/apis/axiosInstance';
import BaseTextarea from '@/components/common/BaseTextarea';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { CommentOptions } from '@/components/post/interfaces/postInterfaces';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import React, { FormEvent, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import CommentButton from '../elements/CommentButton';
import style from '../styles/comment.module.css';

type CommentTypes = 'write' | 'update';

const CommentWriteForm = ({
  type,
  setCommentList,
  setIsModify,
  id,
}: {
  type: CommentTypes;
  setCommentList: React.Dispatch<SetStateAction<CommentOptions[]>>;
  setIsModify?: React.Dispatch<SetStateAction<boolean>>;
  id?: number;
}) => {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  async function writeCommentProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const commentData = {
      postId: id,
      content: comment,
    };

    const { message, success, data } = await handleWriteComment(
      type,
      commentData,
      id,
    );

    if (success) {
      if (type === 'write') {
        setCommentList(prevList => [data, ...prevList]);
      } else {
        setCommentList(prevList =>
          prevList.map(item => (item.id === id ? (item = data) : item)),
        );
      }

      setComment('');
    }

    const modalData: ModalState = {
      title: '댓글',
      type: 'confirm',
      message,
      success,
      routerType: undefined,
      modalIsShow: true,
    };

    dispatch(setModal(modalData));

    setDisabled(false);

    if (setIsModify) {
      setIsModify(false);
    }
  }

  async function handleWriteComment(
    type: CommentTypes,
    data: { content: string },
    id?: number,
  ) {
    try {
      let url;
      let response;

      if (type === 'write') {
        url = '/post/comment';
        response = await authAxios.post(url, data);
      } else {
        url = `/post/comment/${id}`;
        response = await authAxios.patch(url, data);
      }

      return makeResponseResult(response, '댓글등록');
    } catch (error: any) {
      return makeResponseResult(error);
    }
  }

  return (
    <form onSubmit={writeCommentProcess} className={style.writeForm}>
      <section className={style.formContentWrap}>
        <BaseTextarea
          name={'content'}
          setValue={setComment}
          value={comment}
          placeholder={'댓글 남기기'}
        />
      </section>
      <section className={style.formButtonWrap}>
        <CommentButton disabled={disabled} type={'submit'} value={'저장'} />
      </section>
    </form>
  );
};

export default CommentWriteForm;
