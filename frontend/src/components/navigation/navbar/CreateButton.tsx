import { PlusIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

export function CreateButton() {
	return (
		<Button
			variant="secondary"
			className="hidden gap-2 rounded-full md:flex"
		>
			<PlusIcon />
			Create
		</Button>
	);
}
