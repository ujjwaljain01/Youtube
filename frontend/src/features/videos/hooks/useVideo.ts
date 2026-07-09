import { useQuery } from '@tanstack/react-query';

import { getVideo } from '../api/video.api';
import { videoQueryKeys } from '../queries/video.query-keys';

export function useVideo(videoId: string) {
	return useQuery({
		queryKey: videoQueryKeys.detail(videoId),

		queryFn: () => getVideo(videoId),

		enabled: !!videoId,

		staleTime: 1000 * 60 * 5,
	});
}
