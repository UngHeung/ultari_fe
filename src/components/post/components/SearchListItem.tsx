import Link from 'next/link';
import { SetStateAction } from 'react';
import { PostOptions } from '../interfaces/postInterfaces';
import style from '../styles/search.module.css';

const SearchListItem = ({
  setIsSearching,
  post,
  titleStartWith,
  titleEndWith,
  contentStartWith,
  contentEndWith,
  keyword,
}: {
  setIsSearching: React.Dispatch<SetStateAction<boolean>>;
  post: PostOptions;
  titleStartWith: string;
  titleEndWith: string;
  contentStartWith: string;
  contentEndWith: string;
  keyword: string;
}) => {
  return (
    <li className={style.itemWrap}>
      <Link
        href={`/post/detail/${post.id}`}
        onClick={() => setIsSearching(false)}
      >
        <strong className={style.title}>
          <span>{titleStartWith}</span>
          <span className={style.keyword}>{keyword}</span>
          <span>{titleEndWith}</span>
        </strong>
        <div className={style.line}></div>
        <p className={style.content}>
          <span>{contentStartWith}</span>
          <span className={style.keyword}>{keyword}</span>
          <span>{contentEndWith}</span>
        </p>
      </Link>
    </li>
  );
};

export default SearchListItem;
