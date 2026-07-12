// src/components/navigation/sidebar/SidebarItem.tsx

import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { NavLink } from 'react-router-dom';

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { useSidebarCollapsed } from '@/store/sidebar.selector';
import { cn } from '@/lib/utils';

import type { NavigationItem } from '@/types/navigation.types';

interface SidebarItemProps {
	item: NavigationItem;
}

export function SidebarItem({ item }: SidebarItemProps) {
	const collapsed = useSidebarCollapsed();

	const Icon = item.icon;

	return (
		<NavLink to={item.href} end>
			{({ isActive }) => (
				<Tooltip delayDuration={150}>
					<TooltipTrigger asChild>
						<motion.div
							layout
							whileHover={{
								scale: 1.02,
							}}
							whileTap={{
								scale: 0.97,
							}}
							className={cn(
								'relative mx-2 my-1 flex h-11 cursor-pointer select-none items-center overflow-hidden rounded-xl',
								collapsed
									? 'justify-center px-0'
									: 'justify-between px-3',

								item.disabled &&
									'pointer-events-none opacity-50',
							)}
						>
							<LayoutGroup>
								{isActive && (
									<motion.div
										layoutId="sidebar-active"
										className="absolute inset-0 rounded-xl bg-primary"
										transition={{
											type: 'spring',
											stiffness: 400,
											damping: 34,
										}}
									/>
								)}
							</LayoutGroup>

							<div className="relative z-10 flex items-center">
								<motion.div
									whileHover={{
										rotate: collapsed ? 0 : -6,
										scale: 1.08,
									}}
									transition={{
										duration: 0.18,
									}}
									className={cn(
										'flex items-center',
										collapsed ? '' : 'gap-3',
									)}
								>
									<Icon
										size={22}
										weight={isActive ? 'fill' : 'duotone'}
										className={cn(
											'shrink-0 transition-colors',
											isActive
												? 'text-primary-foreground'
												: 'text-muted-foreground',
										)}
									/>

									<AnimatePresence initial={false}>
										{!collapsed && (
											<motion.span
												initial={{
													opacity: 0,
													x: -8,
												}}
												animate={{
													opacity: 1,
													x: 0,
												}}
												exit={{
													opacity: 0,
													x: -8,
												}}
												transition={{
													duration: 0.18,
												}}
												className={cn(
													'truncate text-sm font-medium',
													isActive
														? 'text-primary-foreground'
														: 'text-foreground',
												)}
											>
												{item.label}
											</motion.span>
										)}
									</AnimatePresence>
								</motion.div>
							</div>

							<AnimatePresence initial={false}>
								{!collapsed && item.badge && (
									<motion.span
										initial={{
											opacity: 0,
											scale: 0.8,
										}}
										animate={{
											opacity: 1,
											scale: 1,
										}}
										exit={{
											opacity: 0,
											scale: 0.8,
										}}
										className={cn(
											'relative z-10 rounded-full bg-muted px-2 py-0.5 text-xs font-medium',
											isActive &&
												'bg-primary-foreground/20 text-primary-foreground',
										)}
									>
										{item.badge}
									</motion.span>
								)}
							</AnimatePresence>
						</motion.div>
					</TooltipTrigger>

					{collapsed && (
						<TooltipContent side="right">
							{item.label}
						</TooltipContent>
					)}
				</Tooltip>
			)}
		</NavLink>
	);
}
