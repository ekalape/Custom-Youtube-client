import ItemsContainer from 'shared-components/ItemsContainer';
import './styles.scss';
import { useEffect, useState } from 'react';
import { IItem, IYoutubeItem } from 'utils/interfaces/youtube-items.model';
import * as mockItems from 'assets/mock-data.json';
import { useQuery } from '@tanstack/react-query';
import { getVideos } from 'utils/getVideos';

export function MainPage() {
  const [items, setItems] = useState<IItem[]>([]);

  const [word, setWord] = useState('');

  const info = useQuery({ queryKey: ['getVideos', word], queryFn: () => getVideos(word) });

  return (
    <div className='main-page__container container flex justify-center p-2'>
      <ItemsContainer items={info.data || []} isLoading={info.isLoading} />
    </div>
  );
}
