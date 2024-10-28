import UserProfile from '@/components/user/components/UserProfile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPost } from '../../stores/reducer/postReducer';
import { getPostType } from '../functions/getPostContentType';
import { PostOptions } from '../interfaces/postInterfaces';
import style from '../styles/list.module.css';

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
          <div className={style.itemLeft}>
            <div className={style.itemLeftTop}>
              <section className={style.authorWrap}>
                <UserProfile path={props.author.profile?.path} size={25} />
                <strong>{props.author!.name}</strong>
              </section>

              <section className={style.typeWrap}>
                <span
                  className={style.type}
                >{`#${getPostType(props.contentType)}`}</span>
              </section>
            </div>

            <section className={style.contentWrap}>
              <strong className={style.title}>{props.title}</strong>
            </section>
          </div>

          <section className={style.countWrap}>
            <span className={style.iconWrap}>{likeIcon}</span>
            <span className={style.countNumber}>{props.likeCount}</span>
          </section>
        </Link>
      </li>
    </>
  );
};

export default ListItem;

const likeIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99999 12.8571L3.45427 8.30284C2.27713 7.12284 2.27713 5.20855 3.45427 4.02855C4.63141 2.84855 6.54284 2.84855 7.71998 4.02855L7.99999 4.30856L8.27999 4.02855C9.45713 2.84855 11.3686 2.84855 12.5457 4.02855C13.7228 5.20855 13.7228 7.12284 12.5457 8.30284L7.99999 12.8571Z"
      fill="#FF3C3C"
      stroke="#FF3C3C"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
  </svg>
);
