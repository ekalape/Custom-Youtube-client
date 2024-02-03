import axios from 'axios';
import { IItem, IRawYoutubeItem, IYoutubeItem } from 'utils/interfaces/youtube-items.model';

export async function getVideos(word: string) {
  const url = process.env.BASE_URL;
  let items: IItem[] = [];

  try {
    const response = await axios.get(`${url}/search?`, {
      params: {
        key: process.env.API_KEY,
        type: 'video',
        part: 'snippet',
        maxResults: '4',
        q: word,
      },
    });

    const ids = (response?.data.items as IRawYoutubeItem[]).map((x) => x.id.videoId);
    console.log(response?.data);
    console.log(ids);
    const fullResponse = await axios.get(`${url}/videos?`, {
      params: {
        key: process.env.API_KEY,
        part: 'snippet,statistics',
        id: ids.join(','),
      },
    });

    console.log(fullResponse);
    items = transformItemsResponse(fullResponse?.data.items);
    console.log('final items', items);
  } catch (error) {
    console.error('error', error);
    return [];
  }
  return items;
}

/* 
  https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=js
  https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics
   */

export function transformItemsResponse(items: IYoutubeItem[]): IItem[] {
  return items.map((x) => ({
    id: x.id,
    title: x.snippet.title,
    description: x.snippet.description,
    imageLinks: x.snippet.thumbnails,
    videoLink: x.snippet.channelId,
    createdAt: x.snippet.publishedAt,
    tags: x.snippet.tags,
    statistics: {
      views: x.statistics.viewCount,
      likes: x.statistics.likeCount,
      dislikes: x.statistics.dislikeCount,
      comments: x.statistics.commentCount,
    },
  }));
}
