// src/features/home/useHomeFeed.ts

import { useVideos } from '@/features/videos';

import { transformVideosToCardData } from '@/features/videos';

// import { tweets } from './mock-tweets';

import { buildHomeFeed } from './home.transformer';

export function useHomeFeed() {
	const { data, isLoading, isError } = useVideos({
		page: 1,
		limit: 9,
	});

	const videos = transformVideosToCardData(data?.docs ?? []);

	return buildHomeFeed({
		videos,

		isLoading,

		isError,
	});
}
