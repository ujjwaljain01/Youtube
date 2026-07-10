// src/features/home/home.transformer.ts

import type { VideoCardData } from '@/types/video.types';
import type { Tweet } from '@/types/tweet.types';

import type { HomeFeedData } from './home.types';

interface BuildHomeFeedOptions {
	videos: VideoCardData[];

	tweets: Tweet[];

	isLoading: boolean;

	isError: boolean;
}

export function buildHomeFeed({
	videos,
	tweets,
	isLoading,
	isError,
}: BuildHomeFeedOptions): HomeFeedData {
	return {
		recommendedVideos: videos.slice(0, 3),

		trendingVideos: videos.slice(3, 6),

		latestVideos: videos.slice(6, 9),

		latestTweets: tweets.slice(0, 4),

		developerTweets: tweets.slice(4, 8),

		isLoading,

		isError,
	};
}
