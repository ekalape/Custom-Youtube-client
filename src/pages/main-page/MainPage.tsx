import ItemsContainer from 'shared-components/ItemsContainer';
import './styles.scss';
import { useEffect, useState } from 'react';
import { IYoutubeItem } from 'utils/interfaces/youtube-items.model';
import * as mockItems from 'assets/mock-data.json';

export function MainPage() {
  const [items, setItems] = useState<IYoutubeItem[]>([]);

  useEffect(() => {
    setItems(mockItems.items);
  }, []);
  return (
    <div className='container flex justify-center p-2'>
      <ItemsContainer items={items} />
    </div>
  );
}
