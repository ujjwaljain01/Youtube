// src/features/videos/queries/video.query-keys.ts

export const videoQueryKeys = {
	all: ['videos'] as const,

	lists: () => [...videoQueryKeys.all, 'list'] as const,

	list: <T extends Record<string, any>>(params?: T) =>
		[...videoQueryKeys.lists(), params] as const,

	details: () => [...videoQueryKeys.all, 'detail'] as const,

	detail: (videoId: string) =>
		[...videoQueryKeys.details(), videoId] as const,
};
