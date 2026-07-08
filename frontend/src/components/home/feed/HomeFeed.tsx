//src/components/home/feed/HomeFeed.tsx

import { VideoSection } from '../sections/VideoSection';
import { TweetSection } from '../sections/TweetSection';
import { useVideos } from '@/features/videos/hooks';


export function HomeFeed() {
	const {data} = useVideos();
	return (
		<div className="space-y-14">
			<VideoSection title="Recommended" videos={data?.docs} />

			<TweetSection title="Latest Tweets" tweets={tweets} />

			<VideoSection title="Trending" videos={videos} />

			<TweetSection title="Developer Updates" tweets={tweets} />

			<VideoSection title="Latest Videos" videos={videos} />
		</div>
	);
}
