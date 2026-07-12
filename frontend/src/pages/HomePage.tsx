import { FeedFilters } from '@/components/home/filters';
import { HomeFeed } from '@/components/home/feed/HomeFeed';

export default function HomePage() {
	return (
		<div className="space-y-8 p-6">
			<FeedFilters />
			<HomeFeed />
		</div>
	);
}
