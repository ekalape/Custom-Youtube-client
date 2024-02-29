import axios from 'axios';
import { IItem, IRawYoutubeItem, IYoutubeItem } from 'utils/interfaces/youtube-items.model';
const url = process.env.BASE_URL;
export async function getVideos(word: string) {
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

    items = await getVideosByIds(ids);
  } catch (error) {
    console.error('error', error);
    return [];
  }
  return items;
}

export async function getVideosByIds(ids: string[] | undefined) {
  if (!ids || ids.length === 0) return [];
  try {
    const fullResponse = await axios.get(`${url}/videos?`, {
      params: {
        key: process.env.API_KEY,
        part: 'snippet,statistics',
        id: ids.join(','),
      },
    });
    return transformItemsResponse(fullResponse?.data.items);
  } catch (e) {
    return [];
  }
}

export function transformItemsResponse(items: IYoutubeItem[]): IItem[] {
  return items.map((x) => ({
    id: x.id,
    title: x.snippet.title,
    description: x.snippet.description,
    imageLinks: x.snippet.thumbnails,
    videoLink: x.snippet.channelId,
    createdAt: x.snippet.publishedAt,
    tags: x.snippet.tags,
    channelTitle: x.snippet.channelTitle,
    statistics: {
      views: x.statistics.viewCount,
      likes: x.statistics.likeCount,
      dislikes: x.statistics.dislikeCount,
      comments: x.statistics.commentCount,
    },
  }));
}
