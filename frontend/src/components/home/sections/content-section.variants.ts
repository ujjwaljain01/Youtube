import { cva } from 'class-variance-authority';

import { CONTENT_GRID } from '@/constants/content-grid';

export const contentGridVariants = cva('grid gap-6', {
	variants: {
		columns: {
			[CONTENT_GRID.VIDEO]: `
				grid-cols-1
				md:grid-cols-2
				2xl:grid-cols-3
			`,

			[CONTENT_GRID.TWEET]: `
				grid-cols-1
				sm:grid-cols-2
				xl:grid-cols-4
			`,

			[CONTENT_GRID.PLAYLIST]: `
				grid-cols-2
				md:grid-cols-3
				2xl:grid-cols-5
			`,

			[CONTENT_GRID.CHANNEL]: `
				grid-cols-2
				md:grid-cols-4
				2xl:grid-cols-6
			`,
		},
	},

	defaultVariants: {
		columns: CONTENT_GRID.VIDEO,
	},
});
