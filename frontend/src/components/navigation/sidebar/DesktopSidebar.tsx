// src/components/navigation/sidebar/DesktopSidebar.tsx

import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';

import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/constants/layout';

import { useNavigation } from '@/hooks/use-navigation';

import { useSidebarCollapsed } from '@/store/sidebar.selector';

import { SidebarFooter } from './SidebarFooter';
import { SidebarGroup } from './SidebarGroup';

export function DesktopSidebar() {
	const collapsed = useSidebarCollapsed();

	const navigation = useNavigation();

	return (
		<motion.aside
			layout
			layoutRoot
			initial={false}
			animate={{
				width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
			}}
			transition={{
				layout: {
					duration: 0.28,
					ease: [0.22, 1, 0.36, 1],
				},
			}}
			className={cn(
				'sticky top-16 hidden',
				'h-[calc(100vh-4rem)]',
				'shrink-0',
				'overflow-hidden',
				'bg-background/95',
				'backdrop-blur-xl',
				'lg:flex',
				'lg:flex-col',
			)}
		>
			{/* Top Gradient */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent" />

			{/* Navigation */}
			<motion.div
				layout
				className="relative flex-1 overflow-y-auto pb-3 scrollbar"
			>
				<AnimatePresence mode="popLayout">
					{navigation.map((section, index) => (
						<motion.div
							key={section.id}
							layout
							initial={{
								opacity: 0,
								y: 10,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							exit={{
								opacity: 0,
								y: 10,
							}}
							transition={{
								delay: index * 0.03,
								duration: 0.22,
							}}
						>
							<SidebarGroup section={section} />
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>

			{/* Bottom Fade */}
			<div className="pointer-events-none absolute inset-x-0 bottom-16 h-16 bg-gradient-to-t from-background to-transparent" />

			{/* Footer */}
			<motion.div
				layout
				className="border-t border-border/60 bg-background/80 backdrop-blur-xl"
			>
				<SidebarFooter />
			</motion.div>
		</motion.aside>
	);
}
