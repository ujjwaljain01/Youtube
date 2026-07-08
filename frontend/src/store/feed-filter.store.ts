import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { FeedFilterId } from '@/types/feed-filter.types';

interface FeedFilterState {
	selected: FeedFilterId;

	setSelected: (id: FeedFilterId) => void;

	reset: () => void;
}

export const useFeedFilterStore = create<FeedFilterState>()(
	persist(
		(set) => ({
			selected: 'all',

			setSelected: (id) =>
				set({
					selected: id,
				}),

			reset: () =>
				set({
					selected: 'all',
				}),
		}),
		{
			name: 'NovaPlay-feed-filter',
		},
	),
);
