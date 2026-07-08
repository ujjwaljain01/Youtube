export const videoKeys = {
	all: ['videos'] as const,

	list: (category?: string) => ['videos', category] as const,

	detail: (id: string) => ['video', id] as const,
};
