import './styles.scss';
import { IYoutubeItem } from 'utils/interfaces/youtube-items.model';
import Card from './Card';
import { useState } from 'react';
import { Portal } from '@headlessui/react';
import ModalFrame from 'shared-components/Modal';

export function ItemsContainer(items: { items: IYoutubeItem[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const chooseCard = (id: string) => {
    setSelectedId(id);
    return id;
  };
  return (
    <>
      <div className='container position-relative p-2 flex items-center justify-center flex-wrap gap-2 border-red-500 border-2'>
        {items.items.map((x) => (
          <Card key={x.id} item={x} chooseCard={() => chooseCard(x.id)} />
        ))}
      </div>
      {selectedId && <ModalFrame itemId={selectedId} closeFrame={() => setSelectedId('')} />}
    </>
  );
}
