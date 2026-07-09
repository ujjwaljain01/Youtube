import { VideoSection, VideoSectionSkeleton } from '../sections';
import { TweetSection } from '../sections/TweetSection';

import { useVideos, transformVideosToCardData } from '@/features/videos';

import { tweets } from '@/features/home/mock-tweets';

export function HomeFeed() {
	const { data, isLoading, isError } = useVideos({
		page: 1,
		limit: 9,
	});

	if (isLoading) {
		return (
			<div className="space-y-14">
				<VideoSectionSkeleton />
			</div>
		);
	}

	if (isError || !data) {
		return <div className="py-20 text-center">Unable to load videos.</div>;
	}

	const videos = transformVideosToCardData(data.docs);

	return (
		<div className="space-y-14">
			<VideoSection title="Recommended" videos={videos.slice(0, 3)} />

			<TweetSection title="Latest Tweets" tweets={tweets.slice(0, 4)} />

			<VideoSection title="Trending" videos={videos.slice(3, 6)} />

			<TweetSection
				title="Developer Updates"
				tweets={tweets.slice(4, 8)}
			/>

			<VideoSection title="Latest Videos" videos={videos.slice(6, 9)} />
		</div>
	);
}
