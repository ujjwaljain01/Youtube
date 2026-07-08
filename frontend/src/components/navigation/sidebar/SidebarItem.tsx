import { NavLink } from 'react-router-dom';

import { useSidebarStore } from '@/store/sidebar.store';
import { cn } from '@/lib/utils';

import type { NavigationItem } from '@/types/navigation.types';

interface SidebarItemProps {
	item: NavigationItem;
}

export function SidebarItem({ item }: SidebarItemProps) {
	const collapsed = useSidebarStore((state) => state.collapsed);

	const Icon = item.icon;

	return (
		<NavLink
			to={item.href}
			end
			className={({ isActive }) =>
				cn(
					'group flex h-10 items-center rounded-xl px-3 transition-colors',
					collapsed ? 'justify-center' : 'justify-between',

					item.disabled && 'pointer-events-none opacity-50',

					isActive
						? 'bg-primary text-primary-foreground'
						: 'text-muted-foreground hover:bg-accent hover:text-foreground',
				)
			}
		>
			<div className={cn('flex items-center', collapsed ? '' : 'gap-3')}>
				<Icon size={22} weight="duotone" className="shrink-0" />

				{!collapsed && (
					<span className="truncate text-sm font-medium">
						{item.label}
					</span>
				)}
			</div>

			{!collapsed && item.badge && (
				<span className="text-xs font-medium">{item.badge}</span>
			)}
		</NavLink>
	);
}
