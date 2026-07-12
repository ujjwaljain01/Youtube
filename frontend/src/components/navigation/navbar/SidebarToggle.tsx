// src/components/navigation/navbar/SidebarToggle.tsx

import { ListIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';

import { useIsMobile } from '@/hooks/useIsMobile';

import {
	useSidebarCollapsed,
	useToggleSidebar,
	useToggleMobileSidebar,
} from '@/store/sidebar.selector';

export function SidebarToggle() {
	const isMobile = useIsMobile();

	const collapsed = useSidebarCollapsed();

	const toggleSidebar = useToggleSidebar();

	const toggleMobileSidebar = useToggleMobileSidebar();

	function handleClick() {
		if (isMobile) {
			toggleMobileSidebar();
			return;
		}

		toggleSidebar();
	}

	return (
		<Button
			size="icon"
			variant="ghost"
			onClick={handleClick}
			className="relative rounded-full"
		>
			<motion.div
				initial={false}
				animate={{
					rotate: collapsed && !isMobile ? 180 : 0,
					scale: 1,
				}}
				whileHover={{
					scale: 1.08,
				}}
				whileTap={{
					scale: 0.9,
				}}
				transition={{
					duration: 0.22,
					ease: [0.22, 1, 0.36, 1],
				}}
			>
				<ListIcon size={22} weight="duotone" />
			</motion.div>
		</Button>
	);
}
