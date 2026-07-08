import type { VideoCardData } from '@/types/video.types';

import { VideoThumbnail } from './VideoThumbnail';
import { VideoMetadata } from './VideoMetadata';
import { VideoMenu } from './VideoMenu';

interface VideoCardProps {
	video: VideoCardData;
}

export function VideoCard({ video }: VideoCardProps) {
	return (
		<article className="group">
			<VideoThumbnail
				id={video._id}
				title={video.title}
				thumbnail={video.thumbnail}
				duration={video.duration}
			/>

			<div className="flex items-start justify-between">
				<VideoMetadata
					id={video._id}
					title={video.title}
					owner={video.owner as never}
					views={video.views}
					createdAt={video.createdAt}
				/>

				<VideoMenu />
			</div>
		</article>
	);
}
