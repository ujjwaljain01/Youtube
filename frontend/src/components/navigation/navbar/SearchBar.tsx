import { MagnifyingGlassIcon } from '@phosphor-icons/react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar() {
	return (
		<div className="flex w-full max-w-xl">
			<Input placeholder="Search" className="rounded-r-none" />

			<Button variant="secondary" className="rounded-l-none border-l">
				<MagnifyingGlassIcon size={20} />
			</Button>
		</div>
	);
}
