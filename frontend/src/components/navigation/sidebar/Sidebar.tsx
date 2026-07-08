// Sidebar.tsx

import { useIsMobile } from '@/hooks/useIsMobile';

import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';

export function Sidebar() {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <MobileSidebar />;
	}

	return <DesktopSidebar />;
}
