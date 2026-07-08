import { CONTENT_GRID } from '@/constants/content-grid';

import { VideoCardSkeleton } from '@/components/home/sections/VideoCardSkeleton';

import { ContentSectionSkeleton } from './ContentSectionSkeleton';

interface VideoSectionSkeletonProps {
	title?: string;

	count?: number;
}

export function VideoSectionSkeleton({
	title,
	count = 6,
}: VideoSectionSkeletonProps) {
	return (
		<ContentSectionSkeleton
			title={title}
			count={count}
			grid={CONTENT_GRID.VIDEO}
			renderItem={() => <VideoCardSkeleton />}
		/>
	);
}
