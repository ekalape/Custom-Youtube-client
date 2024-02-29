import { useRef } from 'react';
import './styles.scss';

type InputProps = {
  handleFilter: (word: string) => void;
  labelText: string;
};

export function FilterInput({ handleFilter, labelText }: InputProps) {
  const wordRef = useRef<HTMLInputElement | null>(null);

  function setFilterWord() {
    handleFilter(wordRef.current?.value.trim().toLowerCase() || '');
  }

  return (
    <div className='search-form flex gap-2'>
      <label className='label'>
        {labelText}
        <input type='text' placeholder='I am looking...' ref={wordRef} onChange={setFilterWord} />
      </label>
    </div>
  );
}
