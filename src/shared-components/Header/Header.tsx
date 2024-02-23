import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import SearchInput from 'shared-components/SearchInput';

import store from 'store/store';
import { setSearchWordAction } from 'store/slices/searchSlice';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

export function Header() {
  let loc = useLocation();
  const navigate = useNavigate();
  const [isVideoPage, setIsVideoPage] = useState<boolean>(false);
  function setSearchWord(word: string) {
    console.log(word);
    store.dispatch(setSearchWordAction(word.trim().toLowerCase()));
  }

  function goBack() {
    navigate(-1);
  }
  useEffect(() => {
    if (loc.pathname.includes('video')) {
      setIsVideoPage(true);
    } else {
      setIsVideoPage(false);
    }
  }, [loc]);

  return (
    <div className='header-container container px-4 flex items-center justify-around  text-white '>
      {isVideoPage ? (
        <ArrowLeftIcon className='w-6 h-6 cursor-pointer' onClick={goBack} />
      ) : (
        <SearchInput handleSearch={(word: string) => setSearchWord(word)} labelText={'Search: '} />
      )}
      <div className='flex gap-4 '>
        <NavLink to={'/'}>Main page</NavLink>
        <NavLink to={'/favorites'}>Favorites</NavLink>
      </div>
    </div>
  );
}
