import { useEffect } from 'react';
import './styles.scss';
import { useParams } from 'react-router';
import YouTube, { YouTubeProps } from 'react-youtube';
import { SelectVideoById } from 'store/slices/selectors';
import { IItem } from 'utils/interfaces/youtube-items.model';

export const VideoPage = () => {
  const { id } = useParams();
  const videoData: IItem = SelectVideoById(id);

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
    <div className='flex py-10 items-center justify-center flex-col gap-5'>
      <h2 className='font-bold text-3xl'>{videoData?.title}</h2>
      <div className='flex items-center justify-center relative p-1  border-2 border-red-800 rounded-xl bg-gradient-to-br from-stone-800 to-stone-500'>
        <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />;
      </div>
      <p className='italic'>{videoData?.description}</p>
    </div>
  );
};
