import { Gear } from '@phosphor-icons/react';

import { SidebarItem } from './SidebarItem';

export function SidebarFooter() {
	return (
		<div className="border-t border-border p-2">
			<SidebarItem
				item={{
					id: 'settings',
					label: 'Settings',
					href: '/settings',
					icon: Gear,
				}}
			/>
		</div>
	);
}
