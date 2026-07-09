// src/features/videos/transformers/video-card.transformer.ts

import type { Video, VideoCardData } from '@/types/video.types';

export function transformVideoToCardData(video: Video): VideoCardData {
	return {
		_id: video._id,

		title: video.title,

		thumbnail: video.thumbnail,

		duration: video.duration,

		views: video.views,

		createdAt: video.createdAt,

		owner: {
			_id: video.owner._id,

			fullName: video.owner.fullName,

			username: video.owner.username,

			avatar: video.owner.avatar,

			isVerified: video.owner.isVerified,
		},
	};
}

export function transformVideosToCardData(videos: Video[]): VideoCardData[] {
	return videos.map(transformVideoToCardData);
}
