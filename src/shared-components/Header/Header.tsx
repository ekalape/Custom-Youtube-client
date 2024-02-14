import { Link, NavLink } from 'react-router-dom';
import './styles.scss';
import SearchInput from 'shared-components/SearchInput';

export function Header() {
  function setSearchWord(word: string) {
    console.log(word);
  }
  return (
    <div className='header-container container px-4 flex items-center justify-around  text-white '>
      <SearchInput handleSearch={(word: string) => setSearchWord(word)} labelText={'Search: '} />
      <div className='flex gap-4 '>
        <NavLink to={'/'}>Main page</NavLink>
        <NavLink to={'/favorites'}>Favorites</NavLink>
      </div>
    </div>
  );
}
