'use client';

import { SliceOptions } from '@/components/stores/constants/stateOptions';
import { ModalState, setModal } from '@/components/stores/reducer/modalRducer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './layout.module.css';
import { resetPost } from '@/components/stores/reducer/postReducer';

export type PostPageType = 'list' | 'write' | 'update';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
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
    const type: PostPageType = pathname.slice(1).split('/')[1] as PostPageType;

    setTitle(getTitle(type, isLoggedIn));

    if (!checkAuth(type, isLoggedIn)) {
      const modalData: ModalState = {
        title: '권한 없음',
        type: 'alert',
        success: false,
        message: '로그인 후 사용 가능합니다.',
        modalIsShow: true,
        routerType: 'push',
        leftPath: '/login',
      };

      dispatch(setModal(modalData));
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      dispatch(resetPost());
    };
  }, []);

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
            <Link href={`/post/update/${postId}`}>수정</Link>
            <Link
              href={'#'}
              onClick={async event => {
                event.preventDefault();

                const modalData: ModalState = {
                  title: '삭제 확인',
                  type: 'prompt',
                  message: '정말 삭제하시겠습니까?',
                  modalIsShow: true,
                  routerType: 'replace',
                  leftPath: `/post/delete/${postId}`,
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
  if ((!isLoggedIn && type === 'write') || (!isLoggedIn && type === 'update')) {
    return false;
  }

  return true;
}

export default PostLayout;
