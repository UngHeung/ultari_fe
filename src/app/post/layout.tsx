'use client';

import { deletePost } from '@/components/post/functions/deletePost';
import { SliceOptions } from '@/components/stores/constants/stateOptions';
import { ModalState, setModal } from '@/components/stores/reducer/modalRducer';
import { resetPost } from '@/components/stores/reducer/postReducer';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './layout.module.css';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const userId = useSelector((state: SliceOptions) => state.user.id);
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.user?.isLoggedIn ?? false,
  );
  const postId = useSelector((state: SliceOptions) => state.post.id);
  const postAuthorId = useSelector(
    (state: SliceOptions) => state.post.author?.id,
  );
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const type = pathname.slice(1).split('/')[1] as 'list' | 'write' | 'update';

    setTitle(getTitle(type, isLoggedIn));

    if (!checkAuth(type, isLoggedIn)) {
      const modalData: ModalState = {
        title: '권한 없음',
        type: 'alert',
        success: false,
        message: '로그인 후 사용 가능합니다.',
        modalIsShow: true,
        path: '/login',
      };

      dispatch(setModal(modalData));
    }

    if (postId !== parseInt(type)) {
      dispatch(resetPost());
    }
  }, [pathname]);

  return (
    <>
      <section className={style.postWrap}>
        <h2 className={style.postTitle}>{title}</h2>
        {children}
      </section>
      <section className={style.buttonWrap}>
        {!title.endsWith('목록') && <Link href={'/post/list'}>목록</Link>}
        {title.endsWith('게시물') && postAuthorId === userId && userId > -1 && (
          <>
            <Link href={'/post/update'}>수정</Link>
            <Link
              href={''}
              onClick={async () => {
                const { success, message } = await deletePost(postId);

                const modalData: ModalState = {
                  title: success ? '게시물 삭제 성공' : '게시물 삭제 실패',
                  type: success ? 'confirm' : 'alert',
                  success,
                  message,
                  modalIsShow: true,
                  path: '/post/list',
                };

                dispatch(setModal(modalData));
              }}
            >
              삭제
            </Link>
          </>
        )}
        {!title.endsWith('작성') && <Link href={'/post/write'}>글쓰기</Link>}
      </section>
    </>
  );
};

function getTitle(type: 'list' | 'write' | 'update', isLoggedIn: boolean) {
  if (type === 'list') {
    return '게시물 목록';
  } else if (type === 'write') {
    return '게시물 작성';
  } else if (type === 'update') {
    return '게시물 수정';
  } else {
    return '게시물';
  }
}

function checkAuth(type: 'list' | 'write' | 'update', isLoggedIn: boolean) {
  if ((!isLoggedIn && type === 'write') || type === 'update') {
    return false;
  }

  return true;
}

export default PostLayout;
