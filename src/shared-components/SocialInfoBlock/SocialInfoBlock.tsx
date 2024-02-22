import { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { IItem } from 'utils/interfaces/youtube-items.model';
import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/16/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';

type SocialPropsType = {
  views: string;
  likes: string;
  comments: string;
  children?: React.ReactNode;
};

export function SocialInfoBlock(props: SocialPropsType) {
  const { views, likes, comments } = props;

  const transform = useCallback(transformCount, []);

  return (
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
      {props.children}
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
