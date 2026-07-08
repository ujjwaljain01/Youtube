import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@phosphor-icons/react';

import { formatViews } from '@/lib/format-views';
import { formatUploadTime } from '@/lib/format-upload-time';

import type { VideoOwner } from '@/types/video.types';

interface VideoMetadataProps {
	id: string;
	title: string;
	owner: VideoOwner;
	views: number;
	createdAt: string;
}

export function VideoMetadata({
	id,
	title,
	owner,
	views,
	createdAt,
}: VideoMetadataProps) {
	return (
		<div className="mt-3 flex gap-3">
			<img
				src={owner.avatar}
				alt={owner.fullName}
				className="h-10 w-10 rounded-full object-cover"
			/>

			<div className="min-w-0 flex-1">
				<Link
					to={`/watch/${id}`}
					className="line-clamp-2 text-sm font-medium"
				>
					{title}
				</Link>

				<div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
					<span>{owner.fullName}</span>

					{owner.isVerified && (
						<CheckCircleIcon weight="fill" size={12} />
					)}
				</div>

				<p className="mt-0.5 text-xs text-muted-foreground">
					{formatViews(views)} • {formatUploadTime(createdAt)}
				</p>
			</div>
		</div>
	);
}
