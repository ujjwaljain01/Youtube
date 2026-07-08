import { Separator } from '@/components/ui/separator';

import { useSidebarStore } from '@/store/sidebar.store';

import type { NavigationSection } from '@/types/navigation.types';

import { SidebarItem } from './SidebarItem';

interface SidebarGroupProps {
	section: NavigationSection;
}

export function SidebarGroup({ section }: SidebarGroupProps) {
	const collapsed = useSidebarStore((state) => state.collapsed);

	return (
		<>
			<div className="px-2 py-2">
				{!collapsed && section.title && (
					<h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						{section.title}
					</h2>
				)}

				<div className="space-y-1">
					{section.items.map((item) => (
						<SidebarItem key={item.id} item={item} />
					))}
				</div>
			</div>

			<Separator />
		</>
	);
}
