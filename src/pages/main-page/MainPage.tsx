import ItemsContainer from 'shared-components/ItemsContainer';
import './styles.scss';
import { useEffect, useState } from 'react';
import { IItem } from 'utils/interfaces/youtube-items.model';
import * as mockItems from 'assets/mock-data.json';
import { useQuery } from '@tanstack/react-query';
import { getVideos, transformItemsResponse } from 'utils/getVideos';
import store, { StoreStateType } from 'store/store';
import { useSelector } from 'react-redux';
import { setVideosAction } from 'store/slices/searchSlice';

export function MainPage() {
  const storedWord: string = useSelector((state: StoreStateType) => state.search.searchWord);
  const storedItems: IItem[] = useSelector((state: StoreStateType) => state.search.videos);

  // const info = useQuery({ queryKey: ['getVideos', word], queryFn: () => getVideos(word) });

  useEffect(() => {
    store.dispatch(setVideosAction(transformItemsResponse(mockItems.items)));
  }, []);
  useEffect(() => {
    console.log('storedWord=', storedWord);
  }, [store.getState()]);

  return (
    <div className='main-page__container container flex justify-center p-2'>
      <ItemsContainer
        items={storedItems.filter((item) => item.title.toLowerCase().includes(storedWord)) || []}
        isLoading={/* info.isLoading */ false}
      />
    </div>
  );
}
