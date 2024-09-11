'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setPost } from '../stores/reducer/postReducer';
import { PostOptions } from './interfaces/postInterfaces';
import style from './styles/list.module.css';

const ListItem = (props: PostOptions, key: number) => {
  const dispatch = useDispatch();
  return (
    <>
      <li key={key}>
        <Link
          href={`/post/${props.id}`}
          className={style.postItem}
          onClick={() => {
            dispatch(setPost(props));
          }}
        >
          <section className={style.contentWrap}>
            <strong className={style.title}>{props.title}</strong>
            <p className={style.content}>{props.content}</p>
          </section>

          <section className={style.informationWrap}>
            <div className={style.typesWrap}>
              <span className={style.visibility}>{props.visibility}</span>
              <span className={style.type}>{props.type}</span>
            </div>

            <div className={style.countsWrap}>
              <span className={style.likeCount}>{props.likeCount}</span>
              <span className={style.viewCount}>{props.viewCount}</span>
            </div>

            <strong className={style.author}>{props.author.name}</strong>
          </section>
        </Link>
      </li>
    </>
  );
};

export default ListItem;
