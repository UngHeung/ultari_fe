import {
  ModalState,
  PostState,
  SliceOptions,
  UserState,
} from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleUpdateLikeCount from '../handlers/handleUpdateLikeCount';
import style from '../styles/detail.module.css';

const DetailLikeCount = ({ postData }: { postData: PostState }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state: SliceOptions) => state.user.id);

  const [likeCount, setLikeCount] = useState<number>(postData?.likeCount || 0);
  const [isAleadyLiked, setIsAleadyLiked] = useState<boolean>(
    checkAleadyLiked(postData?.likers, userId!),
  );
  const [likeButtonColor, setLikeButtonColor] = useState<string>(
    getBackgroundColor(isAleadyLiked),
  );

  const currentLikeCount = likeCount;

  async function likeCountProcess() {
    const result = {
      success: false,
      message: '',
      data: currentLikeCount,
    };

    if (userId! < 0) {
      result.success = false;
      result.message = '로그인이 필요합니다.';
    } else if (postData?.author && postData?.author.id === userId) {
      result.success = false;
      result.message = '내가 쓴 글에 좋아요를 누를 수 없습니다.';
    } else {
      const { ...result } = await handleUpdateLikeCount(postData?.id);

      if (!isAleadyLiked) {
        setLikeButtonColor(getBackgroundColor(true));
      } else if (isAleadyLiked) {
        setLikeButtonColor(getBackgroundColor(false));
      }

      setIsAleadyLiked(prev => !prev);

      if (result.success) {
        setLikeCount(result.data);
      }
    }

    const modalData: ModalState = {
      type: result.success ? 'confirm' : 'alert',
      ...result,
      routerType: undefined,
      modalIsShow: true,
    };

    dispatch(setModal(modalData));
  }

  return (
    <>
      <section className={style.likeWrap}>
        <button
          type={'button'}
          className={style.likeButton}
          onClick={likeCountProcess}
          style={{
            backgroundColor: likeButtonColor,
          }}
        >
          <svg
            className={style.likeImage}
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.2422 1.28513C13.2578 1.48826 13.918 2.47654 13.7148 3.49216L13.625 3.93748C13.418 4.98044 13.0352 5.97263 12.5 6.87498H18.125C19.1602 6.87498 20 7.71482 20 8.74998C20 9.47263 19.5898 10.1015 18.9883 10.414C19.4141 10.7578 19.6875 11.2851 19.6875 11.875C19.6875 12.789 19.0312 13.5508 18.168 13.7148C18.3398 14 18.4375 14.332 18.4375 14.6875C18.4375 15.5195 17.8945 16.2265 17.1445 16.4687C17.1719 16.5976 17.1875 16.7344 17.1875 16.875C17.1875 17.9101 16.3477 18.75 15.3125 18.75H11.5039C10.7617 18.75 10.0391 18.5312 9.42188 18.1211L7.91797 17.1172C6.875 16.4219 6.25 15.25 6.25 13.9961V12.5V10.625V9.65232C6.25 8.51169 6.76953 7.43748 7.65625 6.72263L7.94531 6.49216C8.98047 5.66404 9.6875 4.49998 9.94531 3.2031L10.0352 2.75779C10.2383 1.74216 11.2266 1.08201 12.2422 1.28513ZM1.25 7.49998H3.75C4.44141 7.49998 5 8.05857 5 8.74998V17.5C5 18.1914 4.44141 18.75 3.75 18.75H1.25C0.558594 18.75 0 18.1914 0 17.5V8.74998C0 8.05857 0.558594 7.49998 1.25 7.49998Z" />
          </svg>
        </button>
        <span className={style.likeCount}>{likeCount}</span>
      </section>
    </>
  );
};

function checkAleadyLiked(likers: UserState[], userId: number) {
  if (!likers) return false;

  for (const liker of likers) {
    if (liker.id === userId) {
      return true;
    }
  }

  return false;
}

function getBackgroundColor(isLiked: boolean) {
  const defaultBg = 'var(--color-placeholder)';
  const aleadyBg = 'var(--color-main-green)';

  if (isLiked) {
    return aleadyBg;
  } else {
    return defaultBg;
  }
}

export default DetailLikeCount;
