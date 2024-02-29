import './styles.scss';
import { BarsArrowDownIcon, BarsArrowUpIcon, NoSymbolIcon } from '@heroicons/react/16/solid';
import { SortValues } from 'utils/interfaces/enums';

type InputProps = {
  setValue: (value: SortValues) => void;
  sortType: string;
  defaultValue: SortValues;
};

export function SortInput({ setValue, sortType, defaultValue }: InputProps) {
  function sort(e: React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setValue(target.value as SortValues);
  }

  return (
    <div className='flex gap-1 items-center py-2 px-2 self-end mr-10'>
      <span className='text-white text-sm italic mr-2'>By {sortType}: </span>
      <label className='sort-label'>
        <BarsArrowUpIcon className='h-6 w-6 text-white hover:text-red-500 duration-300' />
        <input
          type='radio'
          name={`${sortType}-radio`}
          value={SortValues.UP}
          checked={defaultValue === SortValues.UP}
          onChange={sort}
        />
      </label>
      <label className='sort-label'>
        <BarsArrowDownIcon className='h-6 w-6 text-white hover:text-red-500 duration-300' />
        <input
          type='radio'
          name={`${sortType}-radio`}
          value={SortValues.DOWN}
          checked={defaultValue === SortValues.DOWN}
          onChange={sort}
        />
      </label>

      <label className='sort-label'>
        <NoSymbolIcon className='h-6 w-6 text-white hover:text-red-500 duration-300' />
        <input
          type='radio'
          name={`${sortType}-radio`}
          value={SortValues.NONE}
          checked={defaultValue === SortValues.NONE}
          onChange={sort}
        />
      </label>
    </div>
  );
}
