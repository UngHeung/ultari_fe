import Loading from '@/components/common/components/Loading';
import { PostOptions } from '../interfaces/postInterfaces';
import style from '../styles/search.module.css';
import SearchListItem from './SearchListItem';

const SearchList = ({
  isLoading,
  searchList,
  keyword,
}: {
  isLoading: boolean;
  searchList: PostOptions[];
  keyword: string;
}) => {
  return (
    <>
      <ul className={style.searchList}>
        {keyword.trim().length < 2 ? (
          <li className={style.message}>{'검색어를 2자 이상 입력해주세요.'}</li>
        ) : searchList.length <= 0 ? (
          <li className={style.message}>{'검색 결과가 없습니다.'}</li>
        ) : (
          searchList.map((item, idx) => {
            return <SearchListItem key={idx} post={item} keyword={keyword} />;
          })
        )}
      </ul>
      {isLoading && <Loading />}
    </>
  );
};

export default SearchList;
