import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import SearchInput from 'shared-components/Inputs/SearchInput';
import store from 'store/store';
import { setSearchWordAction } from 'store/slices/searchSlice';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import FiltersComponent from './Filters';
import { animated, useSpring } from '@react-spring/web';

const AnimatedFiltersComponent = animated(FiltersComponent);

export function Header() {
  let loc = useLocation();
  const navigate = useNavigate();
  const [isVideoPage, setIsVideoPage] = useState<boolean>(false);
  const [isFavsPage, setIsFavsPage] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  function setSearchWord(word: string) {
    store.dispatch(setSearchWordAction(word.trim().toLowerCase()));
  }

  const props = useSpring({
    from: { right: filtersOpen ? -300 : 0 },
    to: { right: filtersOpen ? 0 : -300 },
  });

  function goBack() {
    navigate(-1);
  }

  function closeFilters() {
    setFiltersOpen((prev) => !prev);
  }

  useEffect(() => {
    setIsVideoPage(false);
    setIsFavsPage(false);
    if (loc.pathname.includes('video')) {
      setIsVideoPage(true);
    } else if (loc.pathname.includes('favorites')) {
      setIsFavsPage(true);
    }
  }, [loc]);

  return (
    <div className='header-container container px-4 flex items-center justify-around  text-white '>
      {isVideoPage ? (
        <ArrowLeftIcon className='w-6 h-6 cursor-pointer' onClick={goBack} />
      ) : isFavsPage ? (
        <h2 className='text-2xl text-red-500'>FAVORITE VIDEOS</h2>
      ) : (
        <SearchInput handleSearch={(word: string) => setSearchWord(word)} labelText={'Search: '} />
      )}
      <div className='flex gap-4 '>
        <NavLink to={'/'}>Main page</NavLink>
        <NavLink to={'/favorites'}>Favorites</NavLink>
        <button
          className={`cursor-pointer  duration-300 ${
            filtersOpen ? 'text-red-500' : 'text-white'
          }  hover:text-red-500`}
          onClick={closeFilters}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
            />
          </svg>
        </button>
      </div>

      <AnimatedFiltersComponent close={closeFilters} animStyle={props} />
    </div>
  );
}
