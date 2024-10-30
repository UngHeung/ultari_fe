import ImagesSlider from '@/components/common/components/ImagesSlider';
import useMenuBoxChildStore, {
  MenuBoxChildStore,
} from '@/components/stores/common/menuboxChildrenStore';
import useLoggedStore, {
  LoggedStore,
} from '@/components/stores/user/loggedStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import UserProfile from '@/components/user/components/UserProfile';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PostState } from '../../stores/interfaces/stateInterface';
import mapContentType from '../functions/mapContentType';
import mapVisibility from '../functions/mapVisibility';
import style from '../styles/detail.module.css';
import InnerNav from './InnerNav';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';

const DetailContent = ({ postData }: { postData: PostState }) => {
  const router = useRouter();
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);
  const userId = useUserStore((state: UserStore) => state.user.id);

  const setMenuBox = useMenuBoxChildStore(
    (state: MenuBoxChildStore) => state.setChild,
  );
  const resetMenuBox = useMenuBoxChildStore(
    (state: MenuBoxChildStore) => state.resetChild,
  );

  useEffect(() => {
    setMenuBox(
      <InnerNav
        router={router}
        isLoggedIn={isLoggedIn}
        setModal={setModal}
        type={'detail'}
        postData={postData}
        userId={userId!}
      />,
    );

    return () => {
      resetMenuBox();
    };
  }, []);

  return (
    <>
      <section className={style.head}>
        <h2 className={style.title}>{postData?.title}</h2>
        <span className={style.type}>
          {`#${mapContentType(postData?.contentType)}`}
        </span>
        <span className={style.visibility}>
          {`#${mapVisibility(postData?.visibility)}`}
        </span>
        <div className={style.authorWrap}>
          <span>
            <UserProfile path={postData.author.profile?.path} size={25} />
          </span>
          <span>{postData?.author.name}</span>
        </div>
      </section>

      <section className={style.main}>
        {postData.images && postData.images?.length > 0 && (
          <ImagesSlider folder={'post'} images={postData.images} />
        )}
        <pre className={style.content}>{postData?.content}</pre>
      </section>
    </>
  );
};

export default DetailContent;
