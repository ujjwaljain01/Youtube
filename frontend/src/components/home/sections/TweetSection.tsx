//src/components/home/sections/TweetSection.tsx
import { TweetCard } from '@/components/tweet/card';

import { ContentSection } from './ContentSection';

import { CONTENT_GRID } from '@/constants/content-grid';
import type { Tweet } from '@/types/tweet.types';

interface TweetSectionProps {
	title: string;

	description?: string;

	tweets: Tweet[];

	onViewAll?: () => void;
}

export function TweetSection({
	title,
	description,
	tweets,
	onViewAll,
}: TweetSectionProps) {
	return (
		<ContentSection
			title={title}
			description={description}
			items={tweets}
			grid={CONTENT_GRID.TWEET}
			onViewAll={onViewAll}
			renderItem={(tweet) => <TweetCard key={tweet._id} tweet={tweet} />}
		/>
	);
}
