import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { feedFilters } from '@/data/feed-filters';

import { useFeedFilterStore } from '@/store/feed-filter.store';

import { FeedFilterChip } from './FeedFilterChip';

export function FeedFilters() {
	const selected = useFeedFilterStore((state) => state.selected);

	const setSelected = useFeedFilterStore((state) => state.setSelected);

	return (
		<div className="sticky z-20 bg-background">
			<ScrollArea className="w-full whitespace-nowrap">
				<div className="flex  pr-2">
					{feedFilters.map((filter) => (
						<FeedFilterChip
							key={filter.id}
							label={filter.label}
							selected={selected === filter.id}
							onSelect={() => setSelected(filter.id)}
						/>
					))}
				</div>

				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
