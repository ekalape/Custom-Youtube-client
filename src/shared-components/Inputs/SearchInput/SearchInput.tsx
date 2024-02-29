import { FormEvent, useRef } from 'react';
import './styles.scss';

type InputProps = {
  handleSearch: (word: string) => void;
  labelText: string;
};

export function SearchInput({ handleSearch, labelText }: InputProps) {
  const wordRef = useRef<HTMLInputElement | null>(null);

  function setSearchWord(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch(wordRef.current?.value.trim().toLowerCase() || '');
  }

  function clearSearchField() {
    if (wordRef.current) wordRef.current.value = '';
  }

  return (
    <form onSubmit={setSearchWord} className='search-form flex gap-2'>
      <label className='label'>
        {labelText}
        <input type='text' placeholder='I am looking...' ref={wordRef} />
      </label>
      <button
        onClick={clearSearchField}
        type='button'
        className='flex items-center justify-center px-2 border-2 border-white rounded-full hover:border-red-500 hover:text-red-500 duration-300'>
        x
      </button>
    </form>
  );
}
