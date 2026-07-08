import { DotsThreeVerticalIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

export function VideoMenu() {
	return (
		<Button
			size="icon"
			variant="ghost"
			className="h-8 w-8 shrink-0 rounded-full"
		>
			<DotsThreeVerticalIcon size={18} />
		</Button>
	);
}
