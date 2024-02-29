import { CSSProperties } from 'react';
import './styles.scss';
import { animated } from '@react-spring/web';

import SortInput from 'shared-components/Inputs/SortInputs';
import { SortValues } from 'utils/interfaces/enums';
import store, { StoreStateType } from 'store/store';
import {
  setSortingByDate,
  setSortingByLikes,
  setSortingByViews,
  setFilterWord,
} from 'store/slices/sortingSlice';
import { useSelector } from 'react-redux';
import FilterInput from 'shared-components/Inputs/FilterInput';

type FilterPropsType = {
  animStyle: CSSProperties;
  close: () => void;
};

export function FiltersComponent(props: FilterPropsType) {
  const sortByViews = useSelector((state: StoreStateType) => state.sort.byViews);
  const sortByLikes = useSelector((state: StoreStateType) => state.sort.byLikes);
  const sortByDate = useSelector((state: StoreStateType) => state.sort.byDate);

  const viewsSort = (e: SortValues) => {
    store.dispatch(setSortingByViews(e));
  };
  const LikesSort = (e: SortValues) => {
    store.dispatch(setSortingByLikes(e));
  };
  const dateSort = (e: SortValues) => {
    store.dispatch(setSortingByDate(e));
  };

  const filterWord = (word: string) => {
    store.dispatch(setFilterWord(word));
  };

  return (
    <animated.div
      className={`container bg-white/20 absolute z-20  filters__container flex flex-col
    items-center backdrop-blur-md `}
      style={props.animStyle}>
      <button
        onClick={props.close}
        className=' w-10 relative top-3 left-3 border-2 px-3 py-1
        flex items-center justify-center text-center duration-300 self-start
         border-white rounded-full hover:border-red-500 hover:text-red-500'>
        x
      </button>
      <h2 className='font-bold underline'>Sort</h2>
      <SortInput setValue={dateSort} sortType={'date'} defaultValue={sortByDate} />
      <SortInput setValue={viewsSort} sortType={'views'} defaultValue={sortByViews} />
      <SortInput setValue={LikesSort} sortType={'likes'} defaultValue={sortByLikes} />
      <div className='w-full h-0.5 bg-white mt-5'></div>
      <h2 className='font-bold underline mt-2'>Filter</h2>
      <FilterInput handleFilter={filterWord} labelText={''} />
    </animated.div>
  );
}
