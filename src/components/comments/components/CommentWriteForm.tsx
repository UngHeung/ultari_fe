import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import usePostStore, { PostStore } from '@/components/stores/post/postStore';
import React, { FormEvent, SetStateAction, useState } from 'react';
import CommentButton from '../elements/CommentButton';
import CommentTextarea from '../elements/CommentTextarea';
import style from '../styles/comment.module.css';

type CommentTypes = 'write' | 'update';

const CommentWriteForm = ({
  type,
  postId,
  setIsModify,
  id,
  value,
}: {
  type: CommentTypes;
  postId?: number;
  setIsModify?: React.Dispatch<SetStateAction<boolean>>;
  id?: number;
  value?: string;
}) => {
  const setModal = useModalStore((state: ModalStore) => state.setModal);
  const addComment = usePostStore((state: PostStore) => state.addComment);
  const updateComment = usePostStore((state: PostStore) => state.updateComment);

  const [disabled, setDisabled] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(
    type === 'update' ? (value ?? '') : '',
  );

  async function writeCommentProcess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDisabled(true);

    const commentData = {
      postId,
      content: comment,
    };

    const { message, success, data } = await handleWriteComment(
      type,
      commentData,
      id,
    );

    if (success) {
      if (type === 'write') {
        addComment(data);
      } else {
        id && updateComment(id, data);
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

    if (type === 'write') {
    } else if (type === 'update' && id) {
    }

    setModal(modalData);

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
        <CommentTextarea
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
