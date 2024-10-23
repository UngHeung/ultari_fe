import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { CommentOptions } from '@/components/post/interfaces/postInterfaces';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import React, { FormEvent, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from '../styles/comment.module.css';

type CommentTypes = 'write' | 'update';

const CommentWriteForm = ({
  type,
  setCommentList,
}: {
  type: CommentTypes;
  setCommentList: React.Dispatch<SetStateAction<CommentOptions[]>>;
}) => {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState<boolean>(false);

  async function writeCommentProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const formData = new FormData(event.currentTarget);
    const commentData = {
      content: formData.get('content') as string,
    };

    const { message, success, data } = await handleWriteComment(
      type,
      commentData,
    );

    if (success) {
      setCommentList(prevList => [...prevList, data]);
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
  }

  async function handleWriteComment(
    type: CommentTypes,
    data: { content: string },
    id?: number,
  ) {
    try {
      const url = type === 'write' ? '/post/comment' : `/post/${id}/comment}`;
      const response = await authAxios.post(url, data);

      return makeResponseResult(response, '댓글등록');
    } catch (error: any) {
      return makeResponseResult(error);
    }
  }

  return (
    <form onSubmit={writeCommentProcess}>
      <section className={style.contentWrap}>
        <textarea name="content" id="content"></textarea>
      </section>
      <section className={style.buttonWrap}>
        <button disabled={disabled}>저장</button>
      </section>
    </form>
  );
};

export default CommentWriteForm;
