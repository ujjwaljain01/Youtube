import { Toggle } from '@/components/ui/toggle';

import { cn } from '@/lib/utils';

interface FeedFilterChipProps {
	label: string;
	selected: boolean;
	onSelect: () => void;
}

export function FeedFilterChip({
	label,
	selected,
	onSelect,
}: FeedFilterChipProps) {
	return (
		<Toggle
			pressed={selected}
			onPressedChange={onSelect}
			className={cn(
				'h-9 rounded-lg  text-sm font-medium transition-colors',
				selected
					? 'bg-foreground text-background hover:bg-foreground/90'
					: 'bg-muted hover:bg-muted/80',
			)}
		>
			{label}
		</Toggle>
	);
}
