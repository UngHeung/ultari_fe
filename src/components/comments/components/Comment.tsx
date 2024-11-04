'use client';

import { CommentOptions } from '@/components/post/interfaces/postInterfaces';
import style from '../styles/comment.module.css';
import CommentList from './CommentList';
import CommentWriteForm from './CommentWriteForm';

const Comment = ({
  targetId,
  comments,
}: {
  targetId: number;
  comments?: CommentOptions[];
}) => {
  return (
    <section className={style.commentListWrap}>
      <CommentWriteForm type={'write'} postId={targetId} />
      <CommentList comments={comments} />
    </section>
  );
};

export default Comment;
