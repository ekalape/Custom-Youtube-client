import { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { IItem, IYoutubeItem } from 'utils/interfaces/youtube-items.model';
import { EyeIcon, HandThumbUpIcon, HeartIcon } from '@heroicons/react/16/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';
import { animated, useSpring } from '@react-spring/web';

const AnimatedHeart = animated(HeartIcon);

export function Card(props: { item: IItem; chooseCard: () => string }) {
  const { item, chooseCard } = props;
  const [fav, setFav] = useState<boolean>(false);
  const { views, likes, comments } = item.statistics;

  const { x } = useSpring({
    from: { x: 0 },
    x: fav ? 1 : 0,
    config: { duration: 150 },
  });

  const transform = useCallback(transformCount, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (Array.from(target.classList).some((x) => x.includes('heart-icon'))) {
      setFav((prev) => !prev);
    } else chooseCard();
  };

  const addToFavs = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (Array.from(target.classList).some((x) => x.includes('heart-icon'))) {
      setFav((prev) => !prev);
    }
  };

  return (
    <div
      className='card-container p-2 flex  flex-col gap-1  text-stone-950 bg-gradient-to-b from-transparent to-white rounded-md
     border-red-500 border-2 outline-white outline-3 hover:border-3'
      onClick={(e) => handleClick(e)}>
      <p className='text-xl text-center font-bold truncate duration-200 text-white'>{item.title}</p>
      <button
        className='heart-icon-btn flex gap-1 items-center px-3 py-1 border-2 border-red-400 rounded-lg self-end'
        onClick={(e) => addToFavs(e)}>
        {fav ? (
          <HeartIcon className='heart-icon h-5 w-5 text-red-400 duration-200' />
        ) : (
          <HeartIconOutline className='heart-icon h-5 w-5 text-red-400 duration-200' />
        )}

        <AnimatedHeart
          className='heart-icon-anim text-red-400 duration-200'
          style={{
            opacity: x.to({ range: [0, 0.1, 0.8, 0.9, 0.95, 1], output: [0, 1, 1, 0.6, 0, 0] }),
            scale: x.to({
              range: [0, 0.95, 1],
              output: [0.5, 12, 0.5],
            }),
          }}
        />
      </button>
      <img
        src={
          item.imageLinks.standard?.url ? item.imageLinks.standard.url : item.imageLinks.default.url
        }
        alt=''
        className='container rounded-md border-2 duration-200'
      />
      <p className='text-xs italic line-clamp-3 '>{item.description}</p>
      <div className='flex justify-between px-3 pt-2'>
        <span className='flex gap-1 items-center'>
          <EyeIcon className='h-5 w-5 text-red-400' />
          {transform(views)}{' '}
        </span>
        <span className='flex gap-1 items-center'>
          <HandThumbUpIcon className='h-5 w-5 text-red-400' />
          {transform(likes)}{' '}
        </span>
        <span className='flex gap-1 items-center'>
          <ChatBubbleBottomCenterTextIcon className='h-5 w-5 text-red-400' />
          {transform(comments)}{' '}
        </span>
      </div>
    </div>
  );
}

export function transformCount(count: string) {
  if (Number(count) > 1000000) {
    count = Math.floor(Number(count) / 1000000) + 'kk';
  }
  if (Number(count) > 1000) {
    count = Math.floor(Number(count) / 1000) + 'k';
  }
  return count;
}
