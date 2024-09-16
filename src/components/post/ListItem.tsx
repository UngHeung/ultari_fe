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
              <span className={style.visibility}>
                {getVisibilityType(props.visibility)}
              </span>
              <> & </>
              <span className={style.type}>{getPostType(props.type)}</span>
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

function getVisibilityType(visibility: string) {
  switch (visibility) {
    case 'SCOPE_PUBLIC':
      return '전체공개';
    case 'SCOPE_TEAM':
      return '목장공개';
    case 'SCOPE_PERSONAL':
      return '비공개';
  }
}

function getPostType(type: string) {
  switch (type) {
    case 'TYPE_FREE':
      return '자유';
    case 'TYPE_SHARE':
      return '나눔';
    case 'TYPE_PRAYER':
      return '기도';
    case 'TYPE_THANKS':
      return '감사';
  }
}

export default ListItem;
