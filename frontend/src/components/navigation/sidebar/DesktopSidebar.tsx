import { motion } from 'motion/react';

import { Sidebar, SidebarContent } from '@/components/ui/sidebar';

import { useSidebarCollapsed } from '@/store/sidebar.selector';

import { SidebarFooter } from './SidebarFooter';
import { SidebarGroup } from './SidebarGroup';

import { useNavigation } from '@/hooks/use-navigation';
import { useAuthStore } from '@/features/auth/auth.store';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@/constants/layout';

export function DesktopSidebar() {
	const collapsed = useSidebarCollapsed();

	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const navigation = useNavigation();

	return (
		<motion.aside
			aria-label="Desktop navigation"
			layout
			transition={{
				duration: 0.25,
				ease: 'easeInOut',
			}}
			animate={{
				width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
			}}
			className="border-r border-border bg-sidebar"
		>
			<Sidebar
				collapsible="none"
				className="h-full border-none bg-transparent"
			>
				<SidebarContent className="flex-1 overflow-y-auto overflow-x-hidden scrollbar">
					{navigation.map((section) => (
						<SidebarGroup key={section.id} section={section} />
					))}
				</SidebarContent>

				<SidebarFooter />
			</Sidebar>
		</motion.aside>
	);
}
