//src/components/home/sections/VideoSection.tsx

import { VideoCard } from '@/components/video/card';

import { ContentSection } from './ContentSection';

import { CONTENT_GRID } from '@/constants/content-grid';
import type { VideoCardData } from '@/types/video.types';

interface VideoSectionProps {
	title: string;

	description?: string;

	videos: VideoCardData[];

	onViewAll?: () => void;
}

export function VideoSection({
	title,
	description,
	videos,
	onViewAll,
}: VideoSectionProps) {
	return (
		<ContentSection
			title={title}
			description={description}
			items={videos}
			grid={CONTENT_GRID.VIDEO}
			onViewAll={onViewAll}
			renderItem={(video) => <VideoCard key={video._id} video={video} />}
		/>
	);
}
