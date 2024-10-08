'use client';

import {
  ModalState,
  SliceOptions,
} from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { resetPost } from '@/components/stores/reducer/postReducer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './layout.module.css';

export type PostPageType = 'list' | 'write' | 'update';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [title, setTitle] = useState<string>('');

  const userId = useSelector((state: SliceOptions) => state.user.id);

  const postId = useSelector((state: SliceOptions) => state.post.id);
  const postAuthorId = useSelector(
    (state: SliceOptions) => state.post.author?.id,
  );

  useEffect(() => {
    const type: PostPageType = pathname.slice(1).split('/')[1] as PostPageType;

    setTitle(getTitle(type));

    return () => {
      dispatch(resetPost());
    };
  }, [pathname]);

  return (
    <>
      <section className={style.postWrap}>
        <h2 className={style.postTitle}>{title}</h2>
        {children}
      </section>
      <section className={style.buttonWrap}>
        {!title.endsWith('목록') && <Link href={'/post/list'}>목록</Link>}
        {title.endsWith('게시물') &&
          postAuthorId === userId &&
          userId! > -1 && (
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

function getTitle(type: PostPageType) {
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

export default PostLayout;
