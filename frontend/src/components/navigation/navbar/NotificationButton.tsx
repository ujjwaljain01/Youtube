import { BellIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

export function NotificationButton() {
	return (
		<Button variant="ghost" size="icon">
			<BellIcon size={20} />
		</Button>
	);
}
