import { ChangeEventHandler } from 'react';

const SearchInput = ({
  onChange,
  value,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}) => {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={'검색어를 입력해주세요.'}
      />
    </>
  );
};

export default SearchInput;
