import { ArrowRightIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface SectionHeaderProps {
	title: string;
	description?: string;
	onViewAll?: () => void;
}

export function SectionHeader({
	title,
	description,
	onViewAll,
}: SectionHeaderProps) {
	return (
		<div className="mb-6 flex items-center justify-between">
			<div>
				<h2 className="text-xl font-semibold">{title}</h2>

				{description && (
					<p className="text-sm text-muted-foreground">
						{description}
					</p>
				)}
			</div>

			{onViewAll && (
				<Button variant="ghost" size="sm" onClick={onViewAll}>
					View All
					<ArrowRightIcon size={16} />
				</Button>
			)}
		</div>
	);
}
