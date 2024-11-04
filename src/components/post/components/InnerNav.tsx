import { PostPagePosition } from '@/app/post/layout';
import userAuthentication from '@/components/common/functions/userAuthentication';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import usePostStore, { PostStore } from '@/components/stores/post/postStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import { useRouter } from 'next/navigation';
import style from '../styles/inner-nav.module.css';

const InnerNav = ({ type }: { type: PostPagePosition }) => {
  const router = useRouter();

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const setModal = useModalStore((state: ModalStore) => state.setModal);
  const postData = usePostStore((state: PostStore) => state.post);
  const userId = useUserStore((state: UserStore) => state.user.id);

  return (
    <section className={style.menuWrap}>
      {userId && userId !== -1 ? (
        type === 'detail' ? (
          <>
            <button
              type={'button'}
              onClick={event => {
                userAuthentication(isLoggedIn, setModal, event);
                router.push('/post/write');
              }}
            >
              {'새 글 쓰기'}
            </button>
            {postData && userId && postData.author.id === userId ? (
              <>
                <div className={style.menuLine}></div>
                <button
                  type={'button'}
                  onClick={() => {
                    router.push(`/post/update/${postData.id}`);
                  }}
                >
                  {'내 글 수정하기'}
                </button>
                <div className={style.menuLine}></div>
                <button
                  type={'button'}
                  onClick={() => {
                    router.push(`/post/delete/${postData.id}`);
                  }}
                >
                  {'삭제하기'}
                </button>
              </>
            ) : null}
          </>
        ) : null
      ) : null}
    </section>
  );
};

export default InnerNav;
