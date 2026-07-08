import {
	ChatCircleIcon,
	HeartIcon,
	ShareNetworkIcon,
} from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

import type { Tweet } from '@/types/tweet.types';

interface Props {
	tweet: Tweet;
}

export function TweetActions({ tweet }: Props) {
	return (
		<div className="mt-6 flex items-center justify-between">
			<Button variant="ghost" size="sm">
				<HeartIcon weight={tweet.isLiked ? 'fill' : 'regular'} />

				{tweet.likesCount}
			</Button>

			<Button variant="ghost" size="sm">
				<ChatCircleIcon />

				{tweet.commentsCount}
			</Button>

			<Button variant="ghost" size="sm">
				<ShareNetworkIcon />
			</Button>
		</div>
	);
}
