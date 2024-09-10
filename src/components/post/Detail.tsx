import React from 'react';
import style from './styles/detail.module.css';
import { useSelector } from 'react-redux';
import { SliceOptions } from '@/components/stores/constants/stateOptions';

const Detail = () => {
  const post = useSelector((state: SliceOptions) => state.post);
  return (
    <>
      <section className={style.titleWrap}>
        <h2 className={style.title}>{post.title}</h2>
        <span>{`작성일 : ${getDate(post?.createAt.toString())}`}</span>
        <span>{`수정일 : ${getDate(post?.updateAt.toString())}`}</span>
      </section>
      <section className={style.contentWrap}>
        <pre className={style.content}>{post.content}</pre>
      </section>
      <section className={style.buttonWrap}>
        <ul></ul>
      </section>
    </>
  );
};

const getDate = (inputDate: string): string => {
  const [date, time] = inputDate?.split('T');

  return `${date} ${time.split('.')[0]}`;
};

export default Detail;
