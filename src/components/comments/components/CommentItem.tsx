import getDate from '@/components/common/functions/getDate';
import getLastModifiedDate from '@/components/common/functions/getLastModifiedDate';
import { CommentOptions } from '@/components/post/interfaces/postInterfaces';
import UserProfile from '@/components/user/components/UserProfile';
import style from '../styles/comment.module.css';

const CommentItem = ({ comment }: { comment: CommentOptions }) => {
  const { title, date } = getLastModifiedDate(
    getDate(comment.createAt),
    getDate(comment.updateAt),
  );

  return (
    <li className={style.commentItem}>
      <div className={style.userInfoWrap}>
        <UserProfile path={comment.writer.profile?.path} size={25} />
        <strong>{comment.writer.name}</strong>
      </div>
      <div className={style.contentWrap}>
        <span>{comment.content}</span>
      </div>
      <div className={style.dateWrap}>
        <span>{title}</span>
        <span>{date}</span>
      </div>
    </li>
  );
};

export default CommentItem;
