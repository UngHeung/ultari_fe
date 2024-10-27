import userAuthentication from '@/components/common/functions/userAuthentication';
import UserProfile from '@/components/user/components/UserProfile';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import ImagesSlider from '../../common/ImagesSlider';
import {
  PostState,
  SliceOptions,
} from '../../stores/interfaces/stateInterface';
import mapContentType from '../functions/mapContentType';
import mapVisibility from '../functions/mapVisibility';
import style from '../styles/detail.module.css';

const DetailContent = ({ postData }: { postData: PostState }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userId = useSelector((state: SliceOptions) => state.user.id);
  const isLoggedIn = useSelector(
    (state: SliceOptions) => state.logged.isLoggedIn,
  );

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

      <section className={style.menuWrap}>
        <button onClick={router.back}>{backIcon}</button>
        <div className={style.menuLine}></div>
        <button
          onClick={event => {
            userAuthentication(isLoggedIn, dispatch, event);
            router.push('/post/write');
          }}
        >
          {'새 글 쓰기'}
        </button>
        {postData.author.id === userId && (
          <>
            <div className={style.menuLine}></div>
            <button
              onClick={() => {
                router.push(`/post/update/${postData.id}`);
              }}
            >
              내 글 수정하기
            </button>
          </>
        )}
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
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
