// src/components/navigation/sidebar/SidebarItem.tsx

import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

import { useSidebarCollapsed } from "@/store/sidebar.selector";

import type { NavigationItem } from "@/types/navigation.types";

import { SidebarTooltip } from "./SidebarTooltip";
import { SidebarActiveIndicator } from "./SidebarActiveIndicator";

import {
	sidebarItemVariants,
	sidebarLabelVariants,
	sidebarSpring,
} from "./animations";

interface SidebarItemProps {
	item: NavigationItem;
}

export function SidebarItem({ item }: SidebarItemProps) {
	const collapsed = useSidebarCollapsed();

	const Icon = item.icon;

	return (
		<NavLink to={item.href} end={item.end}>
			{({ isActive }) => (
				<SidebarTooltip label={item.label} disabled={!collapsed}>
					<motion.div
						layout
						variants={sidebarItemVariants}
						initial={false}
						whileHover={{
							y: -1,
							scale: 1.015,
						}}
						whileTap={{
							scale: 0.97,
						}}
						transition={sidebarSpring}
						className={cn(
							'group',
							'relative',
							'mx-3',
							'my-1',
							'flex',
							'h-11',
							'cursor-pointer',
							'select-none',
							'items-center',
							'overflow-hidden',
							'rounded-xl',
							'transition-colors',
							'duration-200',

							collapsed
								? 'justify-center'
								: 'justify-between px-3',

							isActive ? '' : 'hover:bg-accent/60',

							item.disabled && 'pointer-events-none opacity-40',
						)}
					>
						{/* Active background */}
						<AnimatePresence initial={false}>
							{isActive && <SidebarActiveIndicator />}
						</AnimatePresence>

						{/* Left Content */}
						<div className="relative z-10 flex items-center">
							<motion.div
								layout
								whileHover={{
									scale: 1.08,
									rotate: collapsed ? 0 : -4,
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
											: 'text-muted-foreground group-hover:text-foreground',
									)}
								/>

								<AnimatePresence initial={false}>
									{!collapsed && (
										<motion.span
											variants={sidebarLabelVariants}
											initial="hidden"
											animate="visible"
											exit="exit"
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
						{/* Right Content */}
						<AnimatePresence initial={false}>
							{!collapsed && item.badge && (
								<motion.div
									layout
									initial={{
										scale: 0.75,
										opacity: 0,
									}}
									animate={{
										scale: 1,
										opacity: 1,
									}}
									exit={{
										scale: 0.75,
										opacity: 0,
									}}
									transition={{
										duration: 0.16,
									}}
									className={cn(
										'relative z-10',
										'rounded-full',
										'px-2',
										'py-0.5',
										'text-[11px]',
										'font-semibold',

										isActive
											? 'bg-primary-foreground/20 text-primary-foreground'
											: 'bg-muted text-muted-foreground',
									)}
								>
									{item.badge}
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</SidebarTooltip>
			)}
		</NavLink>
	);
}