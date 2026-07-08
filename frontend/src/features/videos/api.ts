import { api } from '@/api/client';
import { API } from '@/api/endpoints';

import type { ApiResponse, GetVideosResponse } from '@/types/video.types';

export async function getVideos() {
	const { data } = await api.get<ApiResponse<GetVideosResponse>>(
		API.videos.all,
	);

	return data.data;
}
