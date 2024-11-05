'use client';

import userAuthentication from '@/components/common/functions/userAuthentication';
import MenuBox from '@/components/common/layouts/MenuBox';
import InnerNav from '@/components/post/components/InnerNav';
import ListMenu from '@/components/post/components/ListMenu';
import useTitleAndDescStore, {
  TitleAndDescriptionStore,
} from '@/components/stores/common/titleAndDescriptionStore';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import usePostListStore, {
  PostListStore,
} from '@/components/stores/post/postListStore';
import usePostStore, { PostStore } from '@/components/stores/post/postStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './layout.module.css';

export type PostPagePosition =
  | 'list'
  | 'write'
  | 'update'
  | 'detail'
  | 'delete';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [position, setPosition] = useState<PostPagePosition>('list');

  const setTitle = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.setTitle,
  );
  const setDescription = useTitleAndDescStore(
    (state: TitleAndDescriptionStore) => state.setDescription,
  );
  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const setModal = useModalStore((state: ModalStore) => state.setModal);
  const resetPost = usePostStore((state: PostStore) => state.resetPost);
  const resetPostList = usePostListStore(
    (state: PostListStore) => state.resetList,
  );

  useEffect(() => {
    setTitle('자유 게시판');
    setDescription('자유롭게 소통해요.');

    return () => {
      resetPost();
      resetPostList();
    };
  }, []);

  useEffect(() => {
    const type: PostPagePosition = pathname
      .slice(1)
      .split('/')[1] as PostPagePosition;

    if (type !== 'list' && type !== 'detail') {
      userAuthentication(isLoggedIn, setModal);
    }

    setPosition(type);
  }, [pathname, isLoggedIn]);

  return (
    <>
      <MenuBox>
        {position === 'list' ? (
          <ListMenu />
        ) : position === 'detail' ? (
          <InnerNav type="detail" />
        ) : null}
      </MenuBox>
      <div className={style.postLayout}>
        <section className={style.postWrap}>{children}</section>
        <section className={style.buttonWrap}>
          {position.includes('list') && (
            <Link
              href={'/post/write'}
              onClick={event => userAuthentication(isLoggedIn, setModal, event)}
            >
              {writeButton}
            </Link>
          )}
        </section>
      </div>
    </>
  );
};

export default PostLayout;

const writeButton = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_15_415)">
      <path
        d="M6.66669 34.5833C6.3353 34.5829 6.01762 34.451 5.78329 34.2167C5.54897 33.9824 5.41713 33.6647 5.41669 33.3333V26.365C5.41789 26.0338 5.54964 25.7164 5.78335 25.4816L24.5184 6.74998C24.9394 6.32869 25.4392 5.99448 25.9895 5.76646C26.5397 5.53844 27.1294 5.42108 27.725 5.42108C28.3206 5.42108 28.9104 5.53844 29.4606 5.76646C30.0108 5.99448 30.5107 6.32869 30.9317 6.74998L33.25 9.06831C33.6713 9.48931 34.0055 9.9892 34.2335 10.5394C34.4616 11.0896 34.5789 11.6794 34.5789 12.275C34.5789 12.8706 34.4616 13.4603 34.2335 14.0105C34.0055 14.5608 33.6713 15.0606 33.25 15.4816L14.52 34.2166C14.404 34.3332 14.2661 34.4256 14.1142 34.4885C13.9623 34.5514 13.7994 34.5837 13.635 34.5833H6.66669ZM7.91669 26.8816V32.0833H13.1167L26.3 18.9L21.1 13.7L7.91669 26.8816ZM28.0684 17.1333L31.4867 13.715C31.8676 13.3329 32.0816 12.8154 32.0816 12.2758C32.0816 11.7363 31.8676 11.2187 31.4867 10.8366L29.165 8.51331C28.7831 8.13196 28.2655 7.91776 27.7259 7.91776C27.1862 7.91776 26.6686 8.13196 26.2867 8.51331L22.8667 11.9333L28.0684 17.1333Z"
        fill="#767676"
      />
    </g>
    <defs>
      <clipPath id="clip0_15_415">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
