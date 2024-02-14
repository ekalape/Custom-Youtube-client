import { FormEvent, useState } from 'react';
import './styles.scss';

type InputProps = {
  handleSearch: (word: string) => void;
  labelText: string;
};

export function SearchInput({ handleSearch, labelText }: InputProps) {
  const [word, setWord] = useState('');

  function setSearchWord(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('event==>', e);
    console.log('word==>', word);
    handleSearch(word);
    setWord('');
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={setSearchWord} className='search-form'>
      <label className='label'>
        {labelText}
        <input
          type='text'
          onChange={(e) => setWord(e.target.value)}
          placeholder='I am looking...'
        />
      </label>
    </form>
  );
}
