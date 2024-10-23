'use client';

import {
  CommentOptions,
  PostOptions,
} from '@/components/post/interfaces/postInterfaces';
import { useState } from 'react';
import style from '../styles/comment.module.css';
import CommentList from './CommentList';
import CommentWriteForm from './CommentWriteForm';

const Comment = ({ postData }: { postData: PostOptions }) => {
  const [commentList, setCommentList] = useState<CommentOptions[]>(
    postData.comments ?? [],
  );

  return (
    <section className={style.commentWrap}>
      <CommentWriteForm type={'write'} setCommentList={setCommentList} />
      <CommentList comments={commentList} setCommentList={setCommentList} />
    </section>
  );
};

export default Comment;
