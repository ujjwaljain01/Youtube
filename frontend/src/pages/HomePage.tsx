import { FeedFilters } from '@/components/home/filters';
import { HomeFeed } from '@/components/home/feed/HomeFeed';

export default function HomePage() {
	return (
		<div className="p-4">
			{/* <FeedFilters /> */}
			<HomeFeed />
		</div>
	);
}
