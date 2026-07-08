import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { SectionHeader } from '../sections/SectionHeader';
import { contentGridVariants } from '../sections/content-section.variants';

import type { ContentGrid } from '@/types/content-section.types';

interface ContentSectionSkeletonProps {
	title?: string;

	count?: number;

	grid?: ContentGrid;

	renderItem: () => ReactNode;

	className?: string;
}

export function ContentSectionSkeleton({
	title = 'Loading...',
	count = 6,
	grid,
	renderItem,
	className,
}: ContentSectionSkeletonProps) {
	return (
		<section className={cn('space-y-6', className)}>
			<SectionHeader title={title} />

			<div
				className={contentGridVariants({
					columns: grid,
				})}
			>
				{Array.from({ length: count }).map((_, index) => (
					<div key={index}>{renderItem()}</div>
				))}
			</div>
		</section>
	);
}
