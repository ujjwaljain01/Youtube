import { Sheet, SheetContent } from '@/components/ui/sheet';

import { SidebarContent } from '@/components/ui/sidebar';

import {useMobileSidebarOpen, useCloseMobileSidebar} from '@/store/sidebar.selector';
import { useAuthStore } from '@/store/auth.store';

import { SidebarGroup } from './SidebarGroup';
import { SidebarFooter } from './SidebarFooter';
import { useNavigation } from '@/hooks/use-navigation';

export function MobileSidebar() {
	const mobileOpen = useMobileSidebarOpen();

	const closeMobileSidebar = useCloseMobileSidebar();

	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const navigation = useNavigation();

	return (
		<Sheet
			open={mobileOpen}
			onOpenChange={(open) => {
				if (!open) closeMobileSidebar();
			}}
		>
			<SheetContent side="left" className="w-64 p-0">
				<SidebarContent className="h-full overflow-y-auto py-2">
					{navigation.map((section) => (
						<SidebarGroup key={section.id} section={section} />
					))}
				</SidebarContent>
				<SidebarFooter />
			</SheetContent>
		</Sheet>
	);
}
