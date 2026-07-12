// src/features/home/home.types.ts

import type { VideoCardData } from '@/types/video.types';
import type { Tweet } from '@/types/tweet.types';

export interface HomeFeedData {
	recommendedVideos: VideoCardData[];

	trendingVideos: VideoCardData[];

	latestVideos: VideoCardData[];

	// latestTweets: Tweet[];

	// developerTweets: Tweet[];

	isLoading: boolean;

	isError: boolean;
}
