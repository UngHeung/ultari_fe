import ImagesSlider from '@/components/common/components/ImagesSlider';
import useLoggedStore, { LoggedStore } from '@/components/stores/loggedStore';
import useMenuBoxChildStore, {
  MenuBoxChildStore,
} from '@/components/stores/menuboxChildrenStore';
import UserProfile from '@/components/user/components/UserProfile';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PostState,
  SliceOptions,
} from '../../stores/interfaces/stateInterface';
import mapContentType from '../functions/mapContentType';
import mapVisibility from '../functions/mapVisibility';
import style from '../styles/detail.module.css';
import InnerNav from './InnerNav';

const DetailContent = ({ postData }: { postData: PostState }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useLoggedStore((state: LoggedStore) => state.isLoggedIn);

  const userId = useSelector((state: SliceOptions) => state.user.id);

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
        dispatch={dispatch}
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
