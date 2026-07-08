import { Link } from 'react-router-dom';

import { formatDuration } from '@/lib/format-duration';

interface VideoThumbnailProps {
	id: string;
	title: string;
	thumbnail: string;
	duration: number;
}

export function VideoThumbnail({
	id,
	title,
	thumbnail,
	duration,
}: VideoThumbnailProps) {
	return (
		<Link
			to={`/watch/${id}`}
			className="group relative block overflow-hidden rounded-xl"
		>
			<img
				src={thumbnail}
				alt={title}
				loading="lazy"
				className="aspect-video h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
			/>

			<div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
				{formatDuration(duration)}
			</div>
		</Link>
	);
}
