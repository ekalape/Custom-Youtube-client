import ItemsContainer from 'shared-components/ItemsContainer';
import './styles.scss';
import { useEffect } from 'react';
import { IItem } from 'utils/interfaces/youtube-items.model';
import * as mockItems from 'assets/mock-data.json';
import { useQuery } from '@tanstack/react-query';
import { getVideos } from 'utils/getVideos';
import store, { StoreStateType } from 'store/store';
import { useSelector } from 'react-redux';
import { setVideosAction } from 'store/slices/searchSlice';

export function MainPage() {
  const storedWord: string = useSelector((state: StoreStateType) => state.search.searchWord);
  const storedItems: IItem[] = useSelector((state: StoreStateType) => state.search.videos);

  const info = useQuery({
    queryKey: ['getVideos', storedWord],
    queryFn: () => getVideos(storedWord),
  });

  useEffect(() => {
    //store.dispatch(setVideosAction(transformItemsResponse(mockItems.items)));

    if (info.data) {
      store.dispatch(setVideosAction(info.data));
    }
  }, [info, storedWord]);

  return (
    <div className='main-page__container container flex justify-center p-2'>
      {storedWord ? (
        <ItemsContainer items={storedItems} isLoading={info.isLoading} />
      ) : (
        <div className='flex items-end relative left-1/5 animate-bounce top-8'>
          <svg viewBox='0 0 44.77 135.66' width={'10%'} height={'100%'} fill='red'>
            <g>
              <polygon points='23.26,24.74 24.14,134.12 21.14,134.12 22.02,24.74 23.26,24.74 	' />
            </g>
            <g>
              <g>
                <polygon
                  points='42.89,47.6 21.31,7.94 23.97,7.94 2.37,47.6 1.03,46.89 21.31,6.55 22.64,3.91 23.97,6.55 44.26,46.89 
			42.89,47.6 		'
                />
              </g>
            </g>
          </svg>
          <p className='text-2xl relative  top-1 w-40 '>Start by entering the search word</p>
        </div>
      )}
    </div>
  );
}
