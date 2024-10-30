import useKeywordStore, {
  KeywordStore,
} from '@/components/stores/common/keywordStore';
import { ChangeEventHandler } from 'react';

const SearchInput = ({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  const keyword = useKeywordStore((state: KeywordStore) => state.keyword);

  return (
    <>
      <input
        type="text"
        value={keyword}
        onChange={onChange}
        placeholder={'검색어를 입력해주세요.'}
      />
    </>
  );
};

export default SearchInput;
