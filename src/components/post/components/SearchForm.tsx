import { authAxios } from '@/apis/axiosInstance';
import useKeywordStore, {
  KeywordStore,
} from '@/components/stores/keywordStore';
import useSearchListStore, {
  SearchListStore,
} from '@/components/stores/searchDataStore';
import Link from 'next/link';
import { SetStateAction, useEffect, useTransition } from 'react';
import SearchInput from '../elements/SearchInput';
import style from '../styles/search.module.css';

const SearchForm = ({
  setIsSearching,
}: {
  setIsSearching: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const keyword = useKeywordStore((state: KeywordStore) => state.keyword);
  const setKeyword = useKeywordStore((state: KeywordStore) => state.setKeyword);
  const searchList = useSearchListStore((state: SearchListStore) => state.list);
  const setList = useSearchListStore((state: SearchListStore) => state.setList);
  const resetList = useSearchListStore(
    (state: SearchListStore) => state.resetList,
  );

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (keyword.trim() === '') {
      resetList();
    } else {
      startTransition(async () => {
        const response = await getSearchList();
        setList(response.data);
      });
    }
  }, [keyword]);

  async function getSearchList() {
    const response = await authAxios.get(`/post/find?keyword=${keyword}`);

    return response;
  }

  return (
    <article className={style.searchWrap}>
      <form className={style.search}>
        <SearchInput onChange={event => setKeyword(event.target.value)} />
      </form>
      <section className={style.searchListWrap}>
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
      </section>
    </article>
  );
};

export default SearchForm;

export function changeTextLikeKeyword(
  text: string,
  keyword: string,
): [startWith: string, endWith: string] {
  const [startWith, endWith] = text.split(keyword);

  return [startWith, endWith];
}
