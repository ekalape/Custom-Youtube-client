import { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { IItem } from 'utils/interfaces/youtube-items.model';

import { useNavigate } from 'react-router';
import SocialInfoBlock from 'shared-components/SocialInfoBlock';
import AnimatedFavButton from 'shared-components/AnimatedFavButton';

export function Card(props: { item: IItem; chooseCard: () => string }) {
  const { item, chooseCard } = props;

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (
      Array.from(target.classList).some((x) => x.includes('heart-icon')) ||
      target.nodeName === 'path'
    ) {
      return;
    } else if (Array.from(target.classList).some((x) => x.includes('more-btn'))) {
      chooseCard();
    } else {
      navigate(`video/${item.id}`);
    }
  };

  return (
    <div
      className='card-container p-2 flex  flex-col gap-1  text-stone-950 bg-gradient-to-b from-transparent to-white rounded-md
     border-red-500 border-2 outline-white outline-3 hover:border-3'
      onClick={handleClick}>
      <p className='text-xl text-center font-bold truncate duration-200 text-white'>{item.title}</p>

      <img
        src={
          item.imageLinks.standard?.url ? item.imageLinks.standard.url : item.imageLinks.default.url
        }
        alt=''
        className='container rounded-md border-2 duration-200'
      />

      <div className='flex justify-around gap-3'>
        <button
          className='more-btn flex justify-center flex-1 
          items-center px-3 py-1 rounded-lg bg-stone-700 text-sm font-medium text-white 
                hover:text-red-400 hover:bg-stone-900 duration-300'>
          More...
        </button>
        <AnimatedFavButton videoId={item.id} />
      </div>

      <SocialInfoBlock
        views={item.statistics.views}
        likes={item.statistics.likes}
        comments={item.statistics.comments}
      />
    </div>
  );
}
