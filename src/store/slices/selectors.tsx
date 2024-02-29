import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import store, { StoreStateType } from 'store/store';
import { SortValues } from 'utils/interfaces/enums';
import { IItem } from 'utils/interfaces/youtube-items.model';

export const useSelectVideoById = (id: string | undefined) => {
  if (id) return store.getState().search.videos.find((item: IItem) => item.id === id);
};

export const useSelectSortedItems = (videos: IItem[]): IItem[] => {
  const sortLikesType = useSelector((state: StoreStateType) => state.sort.byLikes);
  const sortViewsType = useSelector((state: StoreStateType) => state.sort.byViews);
  const sortDateType = useSelector((state: StoreStateType) => state.sort.byDate);

  const filterWord = useSelector((state: StoreStateType) => state.sort.filterWord);

  const [result, setResult] = useState([...videos]);

  useEffect(() => {
    switch (sortDateType) {
      case SortValues.UP:
        setResult(
          [...videos].sort(
            (a: IItem, b: IItem) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
          ),
        );
        break;
      case SortValues.DOWN:
        setResult(
          [...videos].sort(
            (a: IItem, b: IItem) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
          ),
        );
        break;
      case SortValues.NONE:
        setResult([...videos]);
        break;
      default:
        setResult([...videos]);
    }
  }, [videos, sortDateType]);

  useEffect(() => {
    switch (sortLikesType) {
      case SortValues.UP:
        setResult(
          [...videos].sort((a: IItem, b: IItem) => +a.statistics.likes - +b.statistics.likes),
        );
        break;
      case SortValues.DOWN:
        setResult(
          [...videos].sort((a: IItem, b: IItem) => +b.statistics.likes - +a.statistics.likes),
        );
        break;
      case SortValues.NONE:
        setResult([...videos]);
        break;
      default:
        setResult([...videos]);
    }
  }, [videos, sortLikesType]);

  useEffect(() => {
    switch (sortViewsType) {
      case SortValues.UP:
        setResult(
          [...videos].sort((a: IItem, b: IItem) => +a.statistics.views - +b.statistics.views),
        );
        break;
      case SortValues.DOWN:
        setResult(
          [...videos].sort((a: IItem, b: IItem) => +b.statistics.views - +a.statistics.views),
        );
        break;
      case SortValues.NONE:
        setResult([...videos]);
        break;
      default:
        setResult([...videos]);
    }
  }, [videos, sortViewsType]);

  if (filterWord) {
    console.log('in the store, filterWord -->', filterWord);
    return result.filter((item: IItem) =>
      item.title.toLowerCase().includes(filterWord.toLowerCase()),
    );
  }
  return result;
};
