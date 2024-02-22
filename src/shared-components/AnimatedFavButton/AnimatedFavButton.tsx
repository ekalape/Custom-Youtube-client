import { useCallback, useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/16/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { animated, useSpring } from '@react-spring/web';
import './styles.scss';

type SocialPropsType = {
  views: string;
  likes: string;
  comments: string;
};
const AnimatedHeart = animated(HeartIcon);
export function AnimatedFavButton() {
  const [fav, setFav] = useState(false);

  const { x } = useSpring({
    from: { x: 0 },
    x: fav ? 1 : 0,
    config: { duration: 150 },
  });

  const makeFav = () => {
    setFav(!fav);
  };

  return (
    <button
      className='heart-icon-btn flex hover:text-red-400 duration-300 hover:border-red-400 justify-center
    items-center px-3 py-1 border-2 border-red-600 rounded-lg'
      onClick={makeFav}>
      {fav ? (
        <HeartIcon className='heart-icon h-5 w-5 text-red-600 duration-200' />
      ) : (
        <HeartIconOutline className='heart-icon h-5 w-5 text-red-600 duration-200' />
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
  );
}
