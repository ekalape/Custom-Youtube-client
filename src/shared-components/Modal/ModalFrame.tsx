import YouTube, { YouTubeProps } from 'react-youtube';
import './styles.scss';
import { IYoutubeItem } from 'utils/interfaces/youtube-items.model';

export function ModalFrame({ itemId, closeFrame }: { itemId: string; closeFrame: () => void }) {
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
  };
  return (
    <div
      className='flex z-10 items-center justify-center fixed bg-stone-800/75 modal-frame top-0'
      onClick={closeFrame}>
      <div className='flex items-center justify-center relative p-1  border-2 border-red-800 rounded-xl bg-gradient-to-br from-stone-800 to-stone-500'>
        <button
          className='absolute text-red-500 -right-5 -top-5 border-2 border-red-700 rounded-full -z-1 bg-stone-800
        hover:scale-150 duration-150 hover:bg-stone-700 hover:z-10 hover:border-red-500
        py-1 px-3'
          onClick={closeFrame}>
          x
        </button>
        <YouTube videoId={itemId} opts={opts} onReady={onPlayerReady} />;
      </div>
    </div>
  );
}
