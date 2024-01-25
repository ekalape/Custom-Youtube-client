import { Link, NavLink } from 'react-router-dom';
import './styles.scss';

export function Header() {
  return (
    <div className='header-container container px-4 flex items-center justify-around  text-red-500'>
      <NavLink to={'/'}>Main page</NavLink>
      <NavLink to={'/favorites'}>Favorites</NavLink>
    </div>
  );
}
