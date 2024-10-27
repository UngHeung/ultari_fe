import { SliceOptions } from '@/components/stores/interfaces/stateInterface';
import { SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentOptions } from '../../post/interfaces/postInterfaces';
import style from '../styles/comment.module.css';
import CommentItem from './CommentItem';

const CommentList = ({
  comments,
  setCommentList,
}: {
  comments: CommentOptions[];
  setCommentList: React.Dispatch<SetStateAction<CommentOptions[]>>;
}) => {
  const userId = useSelector((state: SliceOptions) => state.user.id);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <ul className={style.commentList}>
      {comments.length > 0 ? (
        isOpened ? (
          comments.map((comment, idx) => (
            <CommentItem
              key={idx}
              comment={comment}
              setCommentList={setCommentList}
              userId={userId}
            />
          ))
        ) : (
          <button
            className={style.listOpenButton}
            onClick={() => setIsOpened(true)}
          >
            <CommentItem
              key={0}
              comment={comments[0]}
              setCommentList={setCommentList}
              userId={userId}
            />
          </button>
        )
      ) : (
        <li className={style.isEmpty}>{'아직 댓글이 없습니다.'}</li>
      )}
    </ul>
  );
};

export default CommentList;
