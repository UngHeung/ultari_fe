import { authAxios } from '@/apis/axiosInstance';
import useKeywordStore, {
  KeywordStore,
} from '@/components/stores/common/keywordStore';
import useSearchListStore, {
  SearchListStore,
} from '@/components/stores/common/searchDataStore';
import { debounce } from 'lodash';
import {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
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

  useEffect(() => {
    searchProcess(keyword);
  }, [keyword]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchProcess = useCallback(
    debounce(async (keyword: string) => {
      const response = await getSearchList(keyword);
      if (response) {
        setList(response.data);
      } else {
        resetList();
      }

      setIsLoading(false);
    }, 600),
    [],
  );

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
    setIsLoading(true);
  }

  return (
    <article className={style.searchWrap}>
      <section className={style.search}>
        <SearchInput onChange={handleChange} value={keyword} />
      </section>
      <section className={style.searchListWrap}>
        <SearchList
          setIsSearching={setIsSearching}
          isLoading={isLoading}
          searchList={searchList}
          keyword={keyword}
        />
      </section>
    </article>
  );
};

export default SearchForm;

async function getSearchList(keyword: string) {
  if (!keyword) return;

  if (keyword?.trim() === '' || keyword?.trim().length < 2) return;

  const response = await authAxios.get(`/post/find?keyword=${keyword}`);
  return response;
}
