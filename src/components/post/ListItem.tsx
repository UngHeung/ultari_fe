import viewAndLike from '@/public/images/viewAndLike.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPost } from '../stores/reducer/postReducer';
import {
  contentTypeOptions,
  PostOptions,
  visibilityOptions,
} from './interfaces/postInterfaces';
import style from './styles/list.module.css';

const ListItem = (props: PostOptions, key: number) => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<'dark' | 'light'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );

  function changeTheme(event: MediaQueryListEvent) {
    if (event.matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', changeTheme);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', changeTheme);
    };
  }, []);

  return (
    <>
      <li key={key}>
        <Link
          href={`/post/detail/${props.id}`}
          className={style.postItem}
          onClick={() => dispatch(setPost(props))}
        >
          <section className={style.contentWrap}>
            <strong className={style.title}>{props.title}</strong>
            <p className={style.content}>{props.content}</p>
          </section>

          <section className={style.informationWrap}>
            <section className={style.typesWrap}>
              <span className={style.visibility}>
                {getVisibilityType(props.visibility)}
              </span>
              <span className={style.type}>
                {getPostType(props.contentType)}
              </span>
            </section>

            <section className={style.countsWrap}>
              <div className={style.likeCount}>
                <span className={style.iconWrap}>
                  <Image
                    src={viewAndLike}
                    width={60}
                    height={15}
                    alt="좋아요 개수"
                    style={{ objectPosition: theme === 'dark' ? -30 : -45 }}
                  />
                </span>
                <span className={style.countNumber}>{props.likeCount}</span>
              </div>
              <div className={style.viewCount}>
                <span className={style.iconWrap}>
                  <Image
                    src={viewAndLike}
                    width={60}
                    height={15}
                    alt="조회수"
                    style={{ objectPosition: theme === 'dark' ? 0 : -15 }}
                  />
                </span>
                <span className={style.countNumber}>{props.viewCount}</span>
              </div>
            </section>

            <strong className={style.author}>{props.author!.name}</strong>
          </section>
        </Link>
      </li>
    </>
  );
};

function getVisibilityType(visibility: visibilityOptions) {
  switch (visibility) {
    case 'SCOPE_PUBLIC':
      return '전체공개';
    case 'SCOPE_TEAM':
      return '목장공개';
    case 'SCOPE_PERSONAL':
      return '비공개';
  }
}

function getPostType(contentType: contentTypeOptions) {
  switch (contentType) {
    case 'TYPE_FREE':
      return '자유';
    case 'TYPE_SHARE':
      return '나눔';
    case 'TYPE_PRAYER':
      return '기도제목';
    case 'TYPE_THANKS':
      return '감사제목';
  }
}

export default ListItem;
