import Link from 'next/link';
import React, { SetStateAction } from 'react';
import { PostOptions } from '../interfaces/postInterfaces';
import style from '../styles/search.module.css';
import { changeTextLikeKeyword } from './SearchForm';

const SearchList = ({
  setIsSearching,
  isPending,
  searchList,
  keyword,
}: {
  setIsSearching: React.Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  searchList: PostOptions[];
  keyword: string;
}) => {
  return (
    <ul>
      {isPending ? (
        <li>{'로딩중...'}</li>
      ) : keyword.length < 2 && 0 < keyword.length ? (
        <li>{'검색어를 2자 이상 입력해주세요.'}</li>
      ) : searchList.length <= 0 ? (
        <li>{'검색 결과가 없습니다.'}</li>
      ) : (
        searchList.map((item, idx) => {
          const [titleStartWith, titleEndWith] = changeTextLikeKeyword(
            item.title,
            keyword,
          );
          const [contentStartWith, contentEndWith] = changeTextLikeKeyword(
            item.title,
            keyword,
          );

          return (
            <li key={idx}>
              <Link
                href={`/post/detail/${item.id}`}
                onClick={() => setIsSearching(false)}
              >
                <strong>
                  <span>{titleStartWith}</span>
                  <span style={{ color: 'red' }} className={style.keyword}>
                    {keyword}
                  </span>
                  <span>{titleEndWith}</span>
                </strong>
                <p>
                  <span>{contentStartWith}</span>
                  <span style={{ color: 'red' }} className={style.keyword}>
                    {keyword}
                  </span>
                  <span>{contentEndWith}</span>
                </p>
              </Link>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default SearchList;
