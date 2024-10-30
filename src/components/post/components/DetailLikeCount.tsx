import {
  ModalState,
  PostState,
} from '@/components/stores/interfaces/stateInterface';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useUserStore, {
  UserStore,
  UserStoreOption,
} from '@/components/stores/user/userStore';
import { useState } from 'react';
import handleUpdateLikeCount from '../handlers/handleUpdateLikeCount';
import style from '../styles/detail.module.css';

const DetailLikeCount = ({ postData }: { postData: PostState }) => {
  const userId = useUserStore((state: UserStore) => state.user.id);
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  const [likeCount, setLikeCount] = useState<number>(postData?.likeCount || 0);
  const [isAleadyLiked, setIsAleadyLiked] = useState<boolean>(
    checkAleadyLiked(postData?.likers, userId!),
  );
  const [isLiked, setIsLiked] = useState<string>(
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
      const response = await handleUpdateLikeCount(postData?.id);
      result.success = response.success;
      result.message = response.message;
      result.data = response.data;

      if (!isAleadyLiked) {
        setIsLiked(getBackgroundColor(true));
      } else if (isAleadyLiked) {
        setIsLiked(getBackgroundColor(false));
      }

      setIsAleadyLiked(prev => !prev);

      if (result.success) {
        setLikeCount(result.data);
      }
    }

    const modalData: ModalState = {
      type: result.success ? 'confirm' : 'alert',
      success: result.success,
      message: result.message,
      routerType: undefined,
      modalIsShow: true,
    };

    setModal(modalData);
  }

  return (
    <>
      <section className={style.buttonWrap}>
        <label className={style.buttonLabel} htmlFor="likeButton">
          <svg
            width="31"
            height="30"
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              style={{ fill: isLiked }}
              d="M15.5 27.5777L3.2321 15.1691C3.23204 15.169 3.23198 15.169 3.23191 15.1689C0.255965 12.157 0.256029 7.26577 3.2321 4.25394C6.20169 1.24869 11.0196 1.24869 13.9892 4.25394L13.9901 4.25482L14.7896 5.06194C14.9774 5.25153 15.2332 5.35819 15.5 5.35819C15.7669 5.35819 16.0227 5.25152 16.2105 5.06192L17.01 4.2548L17.0108 4.25394C19.9804 1.24869 24.7983 1.24869 27.7679 4.25394C30.744 7.26577 30.744 12.157 27.7681 15.1689C27.768 15.169 27.768 15.169 27.7679 15.1691L15.5 27.5777Z"
              stroke="#FF3C3C"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
          </svg>
        </label>
        <button
          id={'likeButton'}
          type={'button'}
          className={style.button}
          onClick={likeCountProcess}
        ></button>
        <span className={style.likeCount}>{likeCount}</span>
      </section>
    </>
  );
};

function checkAleadyLiked(likers: UserStoreOption[], userId: number) {
  if (!likers) return false;

  for (const liker of likers) {
    if (liker.id === userId) {
      return true;
    }
  }

  return false;
}

function getBackgroundColor(isLiked: boolean) {
  const defaultBg = '#1e1e1e';
  const aleadyBg = '#FF3C3C';

  if (isLiked) {
    return aleadyBg;
  } else {
    return defaultBg;
  }
}

export default DetailLikeCount;
