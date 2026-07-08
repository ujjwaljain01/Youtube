import { MagnifyingGlassIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

export function SearchButton() {
	return (
		<Button variant="ghost" size="icon" className="md:hidden">
			<MagnifyingGlassIcon size={20} />
		</Button>
	);
}
