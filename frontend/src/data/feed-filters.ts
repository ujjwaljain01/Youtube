import type { ComponentType } from 'react';
import type { IconProps } from '@phosphor-icons/react';

export type Icon = ComponentType<IconProps>;

export interface FeedFilter {
	id: string;
	label: string;
	icon?: Icon;
	disabled?: boolean;
}

export const feedFilters: FeedFilter[] = [
	{
		id: 'all',
		label: 'All',
	},
	{
		id: 'film-animation',
		label: 'Film & Animation',
	},
	{
		id: 'autos',
		label: 'Autos & Vehicles',
	},
	{
		id: 'music',
		label: 'Music',
	},
	{
		id: 'pets',
		label: 'Pets & Animals',
	},
	{
		id: 'sports',
		label: 'Sports',
	},
	{
		id: 'travel',
		label: 'Travel & Events',
	},
	{
		id: 'gaming',
		label: 'Gaming',
	},
	{
		id: 'people',
		label: 'People & Blogs',
	},
	{
		id: 'comedy',
		label: 'Comedy',
	},
	{
		id: 'entertainment',
		label: 'Entertainment',
	},
	{
		id: 'news',
		label: 'News & Politics',
	},
	{
		id: 'howto',
		label: 'How-to & Style',
	},
	{
		id: 'education',
		label: 'Education',
	},
	{
		id: 'science',
		label: 'Science & Technology',
	},
	{
		id: 'nonprofits',
		label: 'Nonprofits & Activism',
	},
	{
		id: 'anime',
		label: 'Anime',
	},
	{
		id: 'action',
		label: 'Action & Adventure',
	},
	{
		id: 'classics',
		label: 'Classics',
	},
	{
		id: 'documentary',
		label: 'Documentary',
	},
	{
		id: 'drama',
		label: 'Drama',
	},
	{
		id: 'family',
		label: 'Family',
	},
	{
		id: 'foreign',
		label: 'Foreign',
	},
	{
		id: 'horror',
		label: 'Horror',
	},
	{
		id: 'scifi',
		label: 'Sci-Fi & Fantasy',
	},
	{
		id: 'thriller',
		label: 'Thriller',
	},
	{
		id: 'shows',
		label: 'Shows',
	},
	{
		id: 'trailers',
		label: 'Trailers',
	},
];
