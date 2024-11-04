'use client';

import { CommentOptions } from '@/components/post/interfaces/postInterfaces';
import { useState } from 'react';
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
  const [commentList, setCommentList] = useState<CommentOptions[]>(
    comments ?? [],
  );

  return (
    <section className={style.commentListWrap}>
      <CommentWriteForm type={'write'} postId={targetId} />
      <CommentList comments={commentList} setCommentList={setCommentList} />
    </section>
  );
};

export default Comment;
