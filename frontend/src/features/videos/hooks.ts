import { useQuery } from '@tanstack/react-query';

import { getVideos } from './api';
import { videoKeys } from './queries';

export function useVideos() {
	return useQuery({
		queryKey: videoKeys.all,

		queryFn: getVideos,
	});
}
