'use client';

import { deletePost } from '@/components/post/functions/deletePost';
import { SliceOptions } from '@/components/stores/constants/stateOptions';
import { ModalState, setModal } from '@/components/stores/reducer/modalRducer';
import { Dispatch } from '@reduxjs/toolkit';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const deletePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.user?.isLoggedIn ?? false,
  );

  useEffect(() => {
    const postId = +pathname.split('/')[3];

    if (!isLoggedIn) {
      router.back();
      return;
    }

    postDeleteProcess(dispatch, postId);
  }, []);

  return <></>;
};

async function postDeleteProcess(dispatch: Dispatch, postId: number) {
  const { success, message } = await deletePost(postId);

  const secondModalData: ModalState = {
    title: success ? '게시물 삭제 성공' : '게시물 삭제 실패',
    type: success ? 'confirm' : 'alert',
    success,
    message,
    modalIsShow: true,
    leftPath: '/post/list',
  };

  dispatch(setModal(secondModalData));
}

export default deletePage;
