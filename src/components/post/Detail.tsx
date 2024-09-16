import { SliceOptions } from '@/components/stores/constants/stateOptions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPost } from '../stores/reducer/postReducer';
import style from './styles/detail.module.css';

const Detail = () => {
  const dispatch = useDispatch();
  const post = useSelector((state: SliceOptions) => state.post);

  useEffect(() => {
    return () => {
      dispatch(resetPost());
    };
  }, []);

  return (
    <>
      <section className={style.titleWrap}>
        <h2 className={style.title}>{post.title}</h2>
        <span>{`작성일 : ${getDate(post?.createAt.toString())}`}</span>
        {post?.createAt !== post.updateAt && (
          <span>{`수정일 : ${getDate(post?.updateAt.toString())}`}</span>
        )}
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

function getDate(inputDate: string) {
  const [date, time] = inputDate?.split('T');

  return `${date} ${time?.split('.')[0]}`;
}

export default Detail;
