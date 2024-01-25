import { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { IYoutubeItem } from 'utils/interfaces/youtube-items.model';
import { EyeIcon, HandThumbUpIcon, HeartIcon } from '@heroicons/react/16/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';

export function Card(props: { item: IYoutubeItem }) {
  const { item } = props;
  const [fav, setFav] = useState<boolean>(false);
  const { viewCount, likeCount, commentCount } = item.statistics;

  const transform = useCallback(transformCount, []);

  const addToFavs = () => {
    console.log(fav);
    setFav((prev) => !prev);
  };

  return (
    <div
      className='card-container p-2 flex  flex-col gap-1 bg-white text-stone-950  rounded-md
     border-red-500 border-2 outline-white outline-3 '>
      <p className='text-xl text-center font-bold truncate duration-200'>{item.snippet.title}</p>
      <button
        className='flex gap-1 items-center px-3 py-1 border-2 border-red-400 rounded-lg self-end'
        onClick={addToFavs}>
        <HeartIcon className='heart-icon h-5 w-5 text-red-400 duration-200' />
        {fav ? `Favorite` : `Add to favorites`}
      </button>
      <img
        src={
          item.snippet.thumbnails.standard?.url
            ? item.snippet.thumbnails.standard.url
            : item.snippet.thumbnails.default.url
        }
        alt=''
        className='container rounded-md border-2 duration-200'
      />
      <p className='text-xs italic line-clamp-3 '>{item.snippet.description}</p>
      <div className='flex justify-between px-3 pt-2'>
        <span className='flex gap-1 items-center'>
          <EyeIcon className='h-5 w-5 text-red-400' />
          {transform(viewCount)}{' '}
        </span>
        <span className='flex gap-1 items-center'>
          <HandThumbUpIcon className='h-5 w-5 text-red-400' />
          {transform(likeCount)}{' '}
        </span>
        <span className='flex gap-1 items-center'>
          <ChatBubbleBottomCenterTextIcon className='h-5 w-5 text-red-400' />
          {transform(commentCount)}{' '}
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
