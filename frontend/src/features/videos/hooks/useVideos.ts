import { useQuery } from '@tanstack/react-query';

import { getVideos } from '../api/video.api';
import { videoQueryKeys } from '../queries/video.query-keys';

import type { GetVideosParams } from '@/types/video.types';

export function useVideos(params: GetVideosParams = {}) {
	return useQuery({
		queryKey: videoQueryKeys.list(params),

		queryFn: () => getVideos(params),

		placeholderData: (previousData) => previousData,

		staleTime: 1000 * 60 * 5,
	});
}
