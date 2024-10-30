import userAuthentication from '@/components/common/functions/userAuthentication';
import { PostState } from '@/components/stores/interfaces/stateInterface';
import { ModalStoreOptions } from '@/components/stores/modal/modalStore';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import style from '../styles/inner-nav.module.css';

const InnerNav = ({
  router,
  isLoggedIn,
  setModal,
  type,
  postData,
  userId,
}: {
  router: AppRouterInstance;
  isLoggedIn: boolean;
  setModal: (modal: ModalStoreOptions) => void;
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
            userAuthentication(isLoggedIn, setModal, event);
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
