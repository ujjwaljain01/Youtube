import type { Tweet } from '@/types/tweet.types';

import { TweetHeader } from './TweetHeader';
import { TweetContent } from './TweetContent';
import { TweetActions } from './TweetActions';

interface TweetCardProps {
	tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
	return (
		<article
			className="
				flex
				flex-col
				rounded-2xl
				border
				bg-card
				p-5
				transition-all
				duration-200
				hover:shadow-md
			"
		>
			<TweetHeader owner={tweet.owner} createdAt={tweet.createdAt} />

			<TweetContent content={tweet.content} />

			<TweetActions tweet={tweet} />
		</article>
	);
}
