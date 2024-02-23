import ItemsContainer from 'shared-components/ItemsContainer';
import './styles.scss';

import { useQuery } from '@tanstack/react-query';
import { getVideosByIds } from 'utils/getVideos';
import { StoreStateType } from 'store/store';
import { useSelector } from 'react-redux';

export function FavoritesPage() {
  const favItems: string[] = useSelector((state: StoreStateType) => state.favorites.favs);

  const favVideos = useQuery({
    queryKey: ['getVideos', favItems],
    queryFn: () => getVideosByIds(favItems),
  });

  return (
    <div className='main-page__container container flex justify-center p-2'>
      {favItems.length > 0 ? (
        <ItemsContainer items={favVideos.data || []} isLoading={favVideos.isLoading} />
      ) : (
        <div>
          <h1>No items in favorites</h1>
        </div>
      )}
    </div>
  );
}
