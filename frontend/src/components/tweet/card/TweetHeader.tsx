import { DotsThree } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

import { formatUploadTime } from '@/lib/format-upload-time';

import type { TweetOwner } from '@/types/tweet.types';

interface Props {
	owner: TweetOwner;

	createdAt: string;
}

export function TweetHeader({ owner, createdAt }: Props) {
	return (
		<div className="mb-4 flex items-start justify-between">
			<div className="flex gap-3">
				<img
					src={owner.avatar}
					alt={owner.fullName}
					className="h-11 w-11 rounded-full object-cover"
				/>

				<div>
					<p className="font-medium">{owner.fullName}</p>

					<p className="text-sm text-muted-foreground">
						@{owner.username}
					</p>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<span className="text-xs text-muted-foreground">
					{formatUploadTime(createdAt)}
				</span>

				<Button size="icon" variant="ghost">
					<DotsThree />
				</Button>
			</div>
		</div>
	);
}
