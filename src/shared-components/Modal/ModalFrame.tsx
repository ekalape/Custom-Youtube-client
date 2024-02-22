import YouTube, { YouTubeProps } from 'react-youtube';
import './styles.scss';
import { SelectVideoById } from 'store/slices/selectors';
import { IItem } from 'utils/interfaces/youtube-items.model';
import SocialInfoBlock from 'shared-components/SocialInfoBlock';
import { Link } from 'react-router-dom';
import AnimatedFavButton from 'shared-components/AnimatedFavButton';

export function ModalFrame({
  itemId,
  closeFrame,
}: {
  itemId: string;
  closeFrame: (e: React.MouseEvent) => void;
}) {
  const videoData: IItem = SelectVideoById(itemId);

  return (
    <div
      className='flex z-10 items-center justify-center fixed bg-stone-800/75 modal-frame top-0'
      onClick={closeFrame}>
      <div className='relative max-w-2xl rounded-lg bg-gray-100 p-6 shadow-sm bg-gradient-to-b from-stone-600 to-white border-2 border-white'>
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
              videoData?.imageLinks.high?.url ||
              videoData?.imageLinks.standard?.url ||
              videoData?.imageLinks.default?.url
            }
            className='h-full w-full rounded-xl object-contain'
          />

          <div>
            <h2 className='text-lg font-medium text-white'>{videoData?.title}</h2>
            <div className='mt-4 text-white'>
              <SocialInfoBlock
                views={videoData.statistics.views}
                likes={videoData.statistics.likes}
                comments={videoData.statistics.comments}>
                <AnimatedFavButton videoId={videoData?.id} />
              </SocialInfoBlock>
            </div>

            <p className='mt-6 text-sm text-stone-800 italic line-clamp-6'>
              {videoData?.description}
            </p>

            <div className='mt-4 sm:text-right'>
              <Link
                to={'/video/' + videoData?.id}
                className='inline-block rounded-lg bg-stone-700 px-5 py-3 text-sm font-medium text-white 
                hover:text-red-400 hover:bg-stone-900 duration-300'>
                Watch video
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
