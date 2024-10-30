import React, { SetStateAction } from 'react';
import { PostOptions } from '../interfaces/postInterfaces';
import style from '../styles/search.module.css';
import { changeTextLikeKeyword } from './SearchForm';
import SearchListItem from './SearchListItem';

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
    <ul className={style.searchList}>
      {isPending ? (
        <li>{'로딩중...'}</li>
      ) : keyword.length < 2 && 0 < keyword.length ? (
        <li className={style.message}>{'검색어를 2자 이상 입력해주세요.'}</li>
      ) : searchList.length <= 0 ? (
        <li className={style.message}>{'검색 결과가 없습니다.'}</li>
      ) : (
        searchList.map((item, idx) => {
          const [titleStartWith, titleEndWith] = changeTextLikeKeyword(
            item.title,
            keyword,
          );
          const [contentStartWith, contentEndWith] = changeTextLikeKeyword(
            item.content,
            keyword,
          );

          return (
            <SearchListItem
              key={idx}
              setIsSearching={setIsSearching}
              post={item}
              titleStartWith={titleStartWith}
              titleEndWith={titleEndWith}
              contentStartWith={contentStartWith}
              contentEndWith={contentEndWith}
              keyword={keyword}
            />
          );
        })
      )}
    </ul>
  );
};

export default SearchList;
