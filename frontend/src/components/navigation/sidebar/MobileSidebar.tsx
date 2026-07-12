// src/components/navigation/sidebar/MobileSidebar.tsx

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

import { Sheet, SheetContent } from '@/components/ui/sheet';

import {
	useCloseSidebar,
	useSidebarMobileOpen,
} from '@/store/sidebar.selector';

import { useNavigation } from '@/hooks/use-navigation';

import { SidebarGroup } from './SidebarGroup';
import { SidebarFooter } from './SidebarFooter';

export function MobileSidebar() {
	const open = useSidebarMobileOpen();

	const close = useCloseSidebar();

	const navigation = useNavigation();

	const location = useLocation();

	useEffect(() => {
		close();
	}, [location.pathname, close]);

	return (
		<Sheet
			open={open}
			onOpenChange={(value) => {
				if (!value) close();
			}}
		>
			<SheetContent
				side="left"
				className="w-[290px] border-r bg-background p-0"
			>
				<motion.div
					initial={{
						x: -40,
						opacity: 0,
					}}
					animate={{
						x: 0,
						opacity: 1,
					}}
					exit={{
						x: -40,
						opacity: 0,
					}}
					transition={{
						type: 'spring',
						stiffness: 280,
						damping: 28,
					}}
					className="flex h-full flex-col"
				>
					<div className="flex-1 overflow-y-auto py-3 scrollbar">
						<AnimatePresence mode="popLayout">
							{navigation.map((section) => (
								<SidebarGroup
									key={section.id}
									section={section}
								/>
							))}
						</AnimatePresence>
					</div>

					<SidebarFooter />
				</motion.div>
			</SheetContent>
		</Sheet>
	);
}
