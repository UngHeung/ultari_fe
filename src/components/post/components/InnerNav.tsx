import userAuthentication from '@/components/common/functions/userAuthentication';
import { PostState } from '@/components/stores/interfaces/stateInterface';
import { Dispatch } from '@reduxjs/toolkit';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import style from '../styles/inner-nav.module.css';

const InnerNav = ({
  router,
  isLoggedIn,
  dispatch,
  type,
  postData,
  userId,
}: {
  router: AppRouterInstance;
  isLoggedIn: boolean;
  dispatch: Dispatch;
  type: 'write' | 'update' | 'list' | 'detail';
  postData?: PostState;
  userId?: number;
}) => {
  return (
    <section className={style.menuWrap}>
      {type !== 'write' && (
        <button
          type={'button'}
          onClick={event => {
            userAuthentication(isLoggedIn, dispatch, event);
            router.push('/post/write');
          }}
        >
          {'새 글 쓰기'}
        </button>
      )}
      {postData && postData.author.id === userId && (
        <>
          <div className={style.menuLine}></div>
          <button
            type={'button'}
            onClick={() => {
              router.push(`/post/update/${postData.id}`);
            }}
          >
            내 글 수정하기
          </button>
        </>
      )}
    </section>
  );
};

export default InnerNav;

const backIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5714 17.1429L6.42859 10L13.5714 2.85714"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
