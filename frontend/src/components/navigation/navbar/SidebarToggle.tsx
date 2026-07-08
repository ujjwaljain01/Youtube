import { ListIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

import { useSidebarStore } from '@/store/sidebar.store';
import { useIsMobile } from '@/hooks/useIsMobile';

export function SidebarToggle() {
	const isMobile = useIsMobile();

	const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);

	const toggleMobileSidebar = useSidebarStore((s) => s.toggleMobileSidebar);

	function handleClick() {
		if (isMobile) {
			toggleMobileSidebar();
		} else {
			toggleSidebar();
		}
	}

	return (
		<Button variant="ghost" size="icon" onClick={handleClick}>
			<ListIcon size={22} />
		</Button>
	);
}
