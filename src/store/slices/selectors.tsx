import { useSelector } from 'react-redux';
import store, { StoreStateType } from 'store/store';
import { IItem } from 'utils/interfaces/youtube-items.model';

export const SelectVideoById = (id: string | undefined) => {
  if (id) return store.getState().search.videos.find((item: IItem) => item.id === id);
};
