import { SetStateAction } from 'react';
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
  return (
    <ul className={style.commentList}>
      {comments.length > 0 ? (
        comments.map((comment, idx) => (
          <CommentItem
            key={idx}
            comment={comment}
            setCommentList={setCommentList}
          />
        ))
      ) : (
        <li>{'아직 댓글이 없습니다.'}</li>
      )}
    </ul>
  );
};

export default CommentList;
