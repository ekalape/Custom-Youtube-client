import './styles.scss';
import { IItem, IRawYoutubeItem, IYoutubeItem } from 'utils/interfaces/youtube-items.model';
import Card from './Card';
import { useEffect, useState } from 'react';
import ModalFrame from 'shared-components/Modal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type YoutubeItemsProps = {
  items: IItem[];
  isLoading: boolean;
};

export function ItemsContainer({ items, isLoading }: YoutubeItemsProps) {
  const [selectedId, setSelectedId] = useState('');

  const chooseCard = (id: string) => {
    setSelectedId(id);
    return id;
  };

  return (
    <>
      {selectedId && <ModalFrame itemId={selectedId} closeFrame={() => setSelectedId('')} />}
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className='items__container container position-relative p-2 flex items-center justify-center flex-wrap gap-2'>
          {items.map((x) => (
            <Card key={x.id} item={x} chooseCard={() => chooseCard(x.id)} />
          ))}
        </div>
      )}
    </>
  );
}
