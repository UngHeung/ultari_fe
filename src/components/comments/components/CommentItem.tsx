import { authAxios } from '@/apis/axiosInstance';
import getDate from '@/components/common/functions/getDate';
import getLastModifiedDate from '@/components/common/functions/getLastModifiedDate';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { CommentOptions } from '@/components/post/interfaces/postInterfaces';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import UserProfile from '@/components/user/components/UserProfile';
import { SetStateAction, useState } from 'react';
import CommentButton from '../elements/CommentButton';
import style from '../styles/comment.module.css';
import CommentWriteForm from './CommentWriteForm';

const CommentItem = ({
  comment,
  setCommentList,
  userId,
}: {
  comment: CommentOptions;
  setCommentList: React.Dispatch<SetStateAction<CommentOptions[]>>;
  userId?: number;
}) => {
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  const [isModify, setIsModify] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { title, date } = getLastModifiedDate(
    getDate(comment.createAt),
    getDate(comment.updateAt),
  );
  const [day, time] = date.split(' ');

  async function deleteCommentProcess() {
    setDisabled(true);

    const { message, success, data } = await handleDeleteComment(comment.id);

    if (success) {
      setCommentList(prevList =>
        prevList.filter(item => item.id !== comment.id),
      );
    }

    const modalData: ModalState = {
      type: 'confirm',
      success,
      message,
      routerType: undefined,
      modalIsShow: true,
    };

    setModal(modalData);

    setDisabled(false);
  }

  async function handleDeleteComment(id: number) {
    try {
      const response = await authAxios.delete(`/post/comment/${id}`);

      return makeResponseResult(response, '댓글삭제');
    } catch (error: any) {
      return makeResponseResult(error);
    }
  }

  return (
    <li className={style.commentItem}>
      <div className={style.itemTop}>
        <section className={style.authorWrap}>
          <UserProfile path={comment.writer?.profile?.path} size={25} />
          <strong>{comment.writer?.name}</strong>
        </section>
        <section className={style.dateWrap}>
          <span>{day}</span>
          <span>{time}</span>
        </section>
      </div>
      <div className={style.itemBottom}>
        <section className={style.contentWrap}>
          <pre>{comment.content}</pre>
        </section>

        {userId && comment.writer.id === userId && (
          <section className={style.buttonWrap}>
            <CommentButton
              disabled={disabled}
              type={'button'}
              value={updateButton}
              onClick={() => setIsModify(prev => !prev)}
            />
            <CommentButton
              disabled={disabled}
              type={'button'}
              value={deleteButton}
              onClick={deleteCommentProcess}
            />
          </section>
        )}
        {isModify && (
          <CommentWriteForm
            type={'update'}
            setCommentList={setCommentList}
            setIsModify={setIsModify}
            id={comment.id}
            value={comment.content}
          />
        )}
      </div>
    </li>
  );
};

export default CommentItem;

const updateButton = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_10_314)">
      <path
        d="M3.33331 17.2917C3.16762 17.2915 3.00878 17.2255 2.89161 17.1084C2.77445 16.9912 2.70853 16.8324 2.70831 16.6667V13.1825C2.70891 13.0169 2.77479 12.8582 2.89165 12.7409L12.2591 3.37502C12.4696 3.16437 12.7196 2.99727 12.9947 2.88326C13.2698 2.76925 13.5647 2.71057 13.8625 2.71057C14.1603 2.71057 14.4552 2.76925 14.7303 2.88326C15.0054 2.99727 15.2553 3.16437 15.4658 3.37502L16.625 4.53419C16.8356 4.74469 17.0027 4.99463 17.1167 5.26974C17.2307 5.54485 17.2894 5.83972 17.2894 6.13752C17.2894 6.43532 17.2307 6.73019 17.1167 7.0053C17.0027 7.28041 16.8356 7.53035 16.625 7.74085L7.25998 17.1084C7.20198 17.1666 7.13302 17.2128 7.05707 17.2443C6.98112 17.2757 6.89969 17.2919 6.81748 17.2917H3.33331ZM3.95831 13.4409V16.0417H6.55831L13.15 9.45002L10.55 6.85002L3.95831 13.4409ZM14.0341 8.56669L15.7433 6.85752C15.9338 6.66648 16.0407 6.40771 16.0407 6.13794C16.0407 5.86816 15.9338 5.6094 15.7433 5.41835L14.5825 4.25669C14.3915 4.06601 14.1327 3.95891 13.8629 3.95891C13.5931 3.95891 13.3342 4.06601 13.1433 4.25669L11.4333 5.96669L14.0341 8.56669Z"
        fill="#767676"
      />
    </g>
    <defs>
      <clipPath id="clip0_10_314">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const deleteButton = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.33331 9.16669V14.1667"
      stroke="#C80E0E"
      strokeWidth="1.248"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.6666 9.16669V14.1667"
      stroke="#C80E0E"
      strokeWidth="1.248"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33331 5.83331H16.6666"
      stroke="#C80E0E"
      strokeWidth="1.248"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 5.83331H10H15V15C15 16.3807 13.8807 17.5 12.5 17.5H7.5C6.11929 17.5 5 16.3807 5 15V5.83331Z"
      stroke="#C80E0E"
      strokeWidth="1.248"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 4.16667C7.5 3.24619 8.24619 2.5 9.16667 2.5H10.8333C11.7538 2.5 12.5 3.24619 12.5 4.16667V5.83333H7.5V4.16667Z"
      stroke="#C80E0E"
      strokeWidth="1.248"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
