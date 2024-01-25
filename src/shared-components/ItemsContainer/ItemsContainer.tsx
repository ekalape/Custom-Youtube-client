import { Link, NavLink } from 'react-router-dom';
import './styles.scss';
import { IYoutubeItem } from 'utils/interfaces/youtube-items.model';
import Card from './Card';

export function ItemsContainer(items: { items: IYoutubeItem[] }) {
  return (
    <div className='container p-2 flex items-center justify-center flex-wrap gap-2 border-red-500 border-2'>
      {items.items.map((x) => (
        <Card key={x.id} item={x} />
      ))}
    </div>
  );
}
