import './styles.scss';
import { useParams } from 'react-router';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useQuery } from '@tanstack/react-query';
import { getVideosByIds } from 'utils/getVideos';
import TagBadge from 'shared-components/TagBadge';
import AnimatedFavButton from 'shared-components/AnimatedFavButton';

export const VideoPage = () => {
  const id = useParams().id || '';
  const videoData = useQuery({
    queryKey: ['getVideosbyId', id],
    queryFn: () => {
      if (id) return getVideosByIds([id]);
    },
  }).data;

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    timeDistance(videoData?.[0].createdAt || '');
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
  };
  return (
    <div className=' container mx-auto flex py-10 px-2 items-center justify-center flex-col gap-5 max-w-5xl'>
      <h2 className='font-bold text-3xl'>{videoData?.[0].title}</h2>

      <div
        className='video__container flex items-center justify-center relative p-1 max-w-5xl
       border-2 border-red-800 rounded-xl bg-gradient-to-br from-stone-800 to-stone-500'>
        <YouTube
          videoId={id}
          opts={opts}
          onReady={onPlayerReady}
          iframeClassName='yt-frame'
          className='yt-frame'
        />
      </div>

      <div className='container mx-auto flex justify-around gap-5 '>
        <h4>
          <span className='text-stone-500 italic text-xs'>Channel: </span>
          {videoData?.[0].channelTitle}
        </h4>
        <p>
          <span className='text-stone-500 italic text-xs'>published: </span>
          {timeDistance(videoData?.[0].createdAt || '')}
        </p>

        <AnimatedFavButton videoId={id} />
      </div>
      <div className=' border-t-2 border-stone-700 flex flex-col items-center justify-center gap-2 p-5'>
        <h3 className='bold text-xl'>Video Description:</h3>
        <p className='italic max-w-4xl'>{videoData?.[0].description}</p>
        <h3 className='bold text-xl'>Tags:</h3>
        <div className=' mx-auto'>
          {videoData?.[0].tags.map((tag) => (
            <TagBadge tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

const timeDistance = (time: string) => {
  const today = Date.now();
  const published = Date.parse(time);
  const minutes = Math.floor((today - published) / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const monthes = Math.floor(days / 30);
  const years = Math.floor(monthes / 12);
  if (years > 0) {
    return `${years} years ago`;
  }
  if (monthes > 0) {
    return `${monthes} months ago`;
  }
  if (days > 0) {
    return `${days} days ago`;
  }
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
};
