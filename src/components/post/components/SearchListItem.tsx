import Link from 'next/link';
import { SetStateAction } from 'react';
import { PostOptions } from '../interfaces/postInterfaces';
import style from '../styles/search.module.css';

const SearchListItem = ({
  setIsSearching,
  post,
  keyword,
}: {
  setIsSearching: React.Dispatch<SetStateAction<boolean>>;
  post: PostOptions;
  keyword: string;
}) => {
  const title = changeTextLikeKeyword(post.title, keyword);
  const content = changeTextLikeKeyword(post.content, keyword);

  return (
    <li className={style.itemWrap}>
      <Link
        href={`/post/detail/${post.id}`}
        onClick={() => setIsSearching(false)}
      >
        <strong className={style.title}>
          {title.length > 1 ? (
            <>
              <span>{title[0]}</span>
              <span className={style.keyword}>{keyword}</span>
              <span>{title[1]}</span>
            </>
          ) : (
            <span>{title[0]}</span>
          )}
        </strong>
        <div className={style.line}></div>
        <p className={style.content}>
          {content.length > 1 ? (
            <>
              <span>{content[0]}</span>
              <span className={style.keyword}>{keyword}</span>
              <span>{content[1]}</span>
            </>
          ) : (
            <span>{content[0]}</span>
          )}
        </p>
      </Link>
    </li>
  );
};

export default SearchListItem;

export function changeTextLikeKeyword(
  text: string,
  keyword: string,
): [startWith: string, endWith: string] | string[] {
  if (!text.includes(keyword)) {
    return [text];
  } else {
    const [startWith, endWith] = text.split(keyword);

    return [startWith, endWith];
  }
}
