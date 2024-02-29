import './styles.scss';
import { IItem } from 'utils/interfaces/youtube-items.model';
import Card from '../Card';
import { useState } from 'react';
import ModalFrame from 'shared-components/Modal';
import { animated, useTransition } from '@react-spring/web';
import { useSelectSortedItems } from 'store/slices/selectors';

type YoutubeItemsProps = {
  items: IItem[];
  isLoading: boolean;
};
const AnimatedModalFrame = animated(ModalFrame);

export function ItemsContainer({ items, isLoading }: YoutubeItemsProps) {
  const [selectedId, setSelectedId] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const sortedItems: IItem[] = useSelectSortedItems(items);

  const transition = useTransition(openModal, {
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0,
      opacity: 0,
    },
  });

  const closeFrame = (e: React.MouseEvent) => {
    const list = Array.from((e.target as HTMLElement).classList);
    if (list.includes('modal-frame') || list.includes('close-btn')) {
      setSelectedId('');
      setOpenModal(false);
    }
  };

  const chooseCard = (id: string) => {
    setSelectedId(id);
    setOpenModal(true);
    return id;
  };

  return (
    <>
      {transition((style, openModal) =>
        openModal ? (
          <AnimatedModalFrame itemId={selectedId} closeFrame={closeFrame} animStyle={style} />
        ) : null,
      )}
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className='items__container container position-relative p-2 flex items-center justify-center flex-wrap gap-2'>
          {sortedItems.map((x) => (
            <Card key={x.id} item={x} chooseCard={() => chooseCard(x.id)} />
          ))}
        </div>
      )}
    </>
  );
}
