import useIsShowStore, {
  IsShowStore,
} from '@/components/stores/common/isShowStore';
import Link from 'next/link';
import { PostOptions } from '../interfaces/postInterfaces';
import style from '../styles/search.module.css';

const SearchListItem = ({
  post,
  keyword,
}: {
  post: PostOptions;
  keyword: string;
}) => {
  const setSearchIsShow = useIsShowStore(
    (state: IsShowStore) => state.setSearchIsShow,
  );

  const titleArray = changeTextLikeKeyword(post.title, keyword);
  const contentArray = changeTextLikeKeyword(post.content, keyword);

  return (
    <li className={style.itemWrap}>
      <Link
        href={`/post/detail/${post.id}`}
        onClick={() => setSearchIsShow(false)}
      >
        <span className={style.name}>{post.author?.name}</span>
        <div className={style.line}></div>
        <strong className={style.title}>
          {titleArray.count === 1 ? (
            <>
              <span>{titleArray.splitTextArray}</span>
            </>
          ) : titleArray.count > 1 ? (
            <>
              {titleArray.splitTextArray.map((item, idx) => {
                return (
                  <span key={idx}>
                    <span>{item}</span>
                    {idx !== titleArray.count - 1 && (
                      <span className={style.keyword}>{keyword}</span>
                    )}
                  </span>
                );
              })}
            </>
          ) : null}
        </strong>
        <div className={style.line}></div>
        <span className={style.content}>
          {contentArray.count === 1 ? (
            <>
              <span>{contentArray.splitTextArray}</span>
            </>
          ) : contentArray.count > 1 ? (
            <>
              {contentArray.splitTextArray.map((item, idx) => {
                return (
                  <span key={idx}>
                    <span>{item}</span>
                    {idx !== contentArray.count - 1 && (
                      <span className={style.keyword}>{keyword}</span>
                    )}
                  </span>
                );
              })}
            </>
          ) : null}
        </span>
      </Link>
    </li>
  );
};

export default SearchListItem;

export function changeTextLikeKeyword(
  text: string,
  keyword: string,
): { count: number; splitTextArray: string[] } {
  if (!text.includes(keyword)) {
    return {
      splitTextArray: [text],
      count: 1,
    };
  } else {
    const splitTextArray = text.split(keyword);
    const count = splitTextArray.length;

    return {
      splitTextArray,
      count,
    };
  }
}
