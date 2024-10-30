import { authAxios } from '@/apis/axiosInstance';
import useKeywordStore, {
  KeywordStore,
} from '@/components/stores/common/keywordStore';
import useSearchListStore, {
  SearchListStore,
} from '@/components/stores/common/searchDataStore';
import { SetStateAction, useEffect, useTransition } from 'react';
import SearchInput from '../elements/SearchInput';
import style from '../styles/search.module.css';
import SearchList from './SearchList';

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
        <SearchList
          setIsSearching={setIsSearching}
          isPending={isPending}
          searchList={searchList}
          keyword={keyword}
        />
      </section>
    </article>
  );
};

export default SearchForm;
