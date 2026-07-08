import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { SectionHeader } from './SectionHeader';
import { contentGridVariants } from './content-section.variants';

import type { ContentGrid } from '@/types/content-section.types';

interface ContentSectionProps<T> {
	title: string;

	description?: string;

	items: T[];

	renderItem: (item: T) => ReactNode;

	grid?: ContentGrid;

	onViewAll?: () => void;

	className?: string;
}

export function ContentSection<T>({
	title,
	description,
	items,
	renderItem,
	grid,
	onViewAll,
	className,
}: ContentSectionProps<T>) {
	return (
		<section className={cn('space-y-6', className)}>
			<SectionHeader
				title={title}
				description={description}
				onViewAll={onViewAll}
			/>

			<div
				className={contentGridVariants({
					columns: grid,
				})}
			>
				{items.map(renderItem)}
			</div>
		</section>
	);
}
