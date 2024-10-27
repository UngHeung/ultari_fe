'use client';

import userAuthentication from '@/components/common/functions/userAuthentication';
import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './layout.module.css';

export type PostPagePosition =
  | 'list'
  | 'write'
  | 'update'
  | 'detail'
  | 'delete';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [position, setPosition] = useState<PostPagePosition>('list');

  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.logged.isLoggedIn,
  );

  useEffect(() => {
    const type: PostPagePosition = pathname
      .slice(1)
      .split('/')[1] as PostPagePosition;

    if (type !== 'list' && type !== 'detail') {
      userAuthentication(isLoggedIn, dispatch);
    }

    setPosition(type);
    setTitle('자유 게시판');
    setDescription('자유롭게 소통해요.');
  }, [pathname, isLoggedIn]);

  return (
    <>
      <section className={style.postWrap}>
        <section className={style.head}>
          <h2 className={style.title}>{title}</h2>
          <span className={style.description}>{description}</span>
        </section>
        <section>{children}</section>
      </section>
      <section className={style.buttonWrap}>
        {!position.includes('write') && (
          <Link
            href={'/post/write'}
            onClick={event => userAuthentication(isLoggedIn, dispatch, event)}
          >
            {writeButton}
          </Link>
        )}
      </section>
    </>
  );
};

export default PostLayout;

const writeButton = (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8.33334"
      y="22.9167"
      width="33.3333"
      height="4.16667"
      rx="2.08333"
      fill="#767676"
    />
    <rect
      x="27.0833"
      y="8.33337"
      width="33.3333"
      height="4.16667"
      rx="2.08333"
      transform="rotate(90 27.0833 8.33337)"
      fill="#767676"
    />
  </svg>
);
