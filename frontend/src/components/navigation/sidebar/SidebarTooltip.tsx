import type { PropsWithChildren } from 'react';

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props extends PropsWithChildren {
	label: string;

	disabled?: boolean;
}

export function SidebarTooltip({ label, disabled, children }: Props) {
	if (disabled) return children;

	return (
		<Tooltip delayDuration={150}>
			<TooltipTrigger asChild>{children}</TooltipTrigger>

			<TooltipContent side="right">{label}</TooltipContent>
		</Tooltip>
	);
}
