import { CONTENT_GRID } from '@/constants/content-grid';

import { TweetCardSkeleton } from '@/components/home/sections/TweetCardSkeleton';

import { ContentSectionSkeleton } from './ContentSectionSkeleton';

interface TweetSectionSkeletonProps {
	title?: string;

	count?: number;
}

export function TweetSectionSkeleton({
	title,
	count = 4,
}: TweetSectionSkeletonProps) {
	return (
		<ContentSectionSkeleton
			title={title}
			count={count}
			grid={CONTENT_GRID.TWEET}
			renderItem={() => <TweetCardSkeleton />}
		/>
	);
}
