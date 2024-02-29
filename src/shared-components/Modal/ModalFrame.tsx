import YouTube, { YouTubeProps } from 'react-youtube';
import './styles.scss';
import { useSelectVideoById } from 'store/slices/selectors';
import { IItem } from 'utils/interfaces/youtube-items.model';
import SocialInfoBlock from 'shared-components/SocialInfoBlock';
import { Link } from 'react-router-dom';
import AnimatedFavButton from 'shared-components/AnimatedFavButton';
import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import { useQuery } from '@tanstack/react-query';
import { getVideosByIds } from 'utils/getVideos';

export function ModalFrame({
  itemId,
  closeFrame,
  animStyle,
}: {
  itemId: string;
  closeFrame: (e: React.MouseEvent) => void;
  animStyle: CSSProperties;
}) {
  //const videoData: IItem = SelectVideoById(itemId);

  const videoData = useQuery({
    queryKey: ['getVideoById', itemId],
    queryFn: () => getVideosByIds([itemId]),
  });

  return (
    <animated.div
      className='flex z-10 items-center justify-center fixed bg-stone-800/75 modal-frame top-0'
      onClick={closeFrame}
      style={{ opacity: animStyle.opacity }}>
      {videoData.data && videoData.data.length && (
        <animated.div
          className='relative max-w-2xl rounded-lg bg-gray-100 p-6 shadow-sm bg-gradient-to-b
       from-stone-600 to-white border-2 border-white'
          style={animStyle}>
          <button
            type='button'
            onClick={closeFrame}
            className='absolute -end-3 -top-3 rounded-full border border-gray-200 bg-white py-1 px-3 text-stone-800 close-btn 
          hover:text-red-500 hover:border-red-500 duration-300'>
            <span className='sr-only'>Close</span>x
          </button>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 text-stone-800 '>
            <img
              alt=''
              src={
                videoData?.data?.[0].imageLinks.high?.url ||
                videoData?.data?.[0].imageLinks.standard?.url ||
                videoData?.data?.[0].imageLinks.default?.url
              }
              className='h-full w-full rounded-xl object-contain'
            />

            <div>
              <h2 className='text-lg font-medium text-white'>{videoData?.data?.[0].title}</h2>
              <div className='mt-4 text-white'>
                <SocialInfoBlock
                  views={videoData.data?.[0].statistics.views || '0'}
                  likes={videoData.data?.[0].statistics.likes || '0'}
                  comments={videoData.data?.[0].statistics.comments || '0'}>
                  <AnimatedFavButton videoId={videoData?.data?.[0].id || '0'} />
                </SocialInfoBlock>
              </div>

              <p className='mt-6 text-sm text-stone-800 italic line-clamp-6'>
                {videoData?.data?.[0].description}
              </p>

              <div className='mt-4 sm:text-right'>
                <Link
                  to={'/video/' + videoData?.data?.[0].id}
                  className='inline-block rounded-lg bg-stone-700 px-5 py-3 text-sm font-medium text-white 
                hover:text-red-400 hover:bg-stone-900 duration-300'>
                  Watch video
                </Link>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </animated.div>
  );
}
