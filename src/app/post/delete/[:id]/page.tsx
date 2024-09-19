'use client';

import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import handleDeletePost from '@/components/post/handlers/handleDeletePost';
import {
  ModalState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { Dispatch } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const deletePage = ({ params }: ParamsOptions) => {
  const postId = params[':id'];
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.user?.isLoggedIn ?? false,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router.back();
      return;
    }

    postDeleteProcess(dispatch, postId);
  }, []);

  return <></>;
};

async function postDeleteProcess(dispatch: Dispatch, postId: number) {
  const { status, success, message } = await handleDeletePost(postId);

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

export default deletePage;
