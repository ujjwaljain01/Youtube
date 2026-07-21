// src/components/navigation/sidebar/SidebarItem.tsx

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useCallback, useState, memo } from 'react';
import { useSidebarCollapsed } from '@/store/sidebar.selector';
import type { NavigationItem } from '@/types/navigation.types';

import {
	sidebarItemVariants,
	sidebarLabelVariants,
	sidebarSpring,
} from './animations';

interface SidebarItemProps {
	item: NavigationItem;
}

interface RippleEffect {
	id: number;
	x: number;
	y: number;
}

export const SidebarItem = memo(function SidebarItem({
	item,
}: SidebarItemProps) {
	const collapsed = useSidebarCollapsed();
	const reduceMotion = useReducedMotion();
	const Icon = item.icon;

	// Fixed missing state for the ripple effect calculation
	const [ripples, setRipples] = useState<RippleEffect[]>([]);

	const handleRipple = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (reduceMotion) return;

			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const id = Date.now();

			setRipples((prev) => [...prev, { id, x, y }]);

			setTimeout(() => {
				setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
			}, 500);
		},
		[reduceMotion],
	);

	return (
		<NavLink to={item.href} end={item.end} className="block">
			{({ isActive }) => (
				<motion.div
					layout
					initial={false}
					variants={sidebarItemVariants}
					whileHover={reduceMotion ? {} : { y: -1, scale: 1.015 }}
					whileTap={reduceMotion ? {} : { scale: 0.97 }}
					transition={sidebarSpring}
					onClick={handleRipple}
					className={cn(
						'group relative mx-3 my-1 block h-11 overflow-hidden rounded-xl transition-colors duration-200',
						isActive ? '' : 'hover:bg-accent/60',
						item.disabled && 'pointer-events-none opacity-50',
					)}
				>
					<Tooltip delayDuration={300}>
						<TooltipTrigger>
							<div
								className={cn(
									'relative z-10 flex h-full w-full items-center',
									collapsed
										? 'justify-center'
										: 'justify-between px-3',
								)}
							>
								{/* 1. Ripple */}
								<AnimatePresence>
									{!reduceMotion &&
										ripples.map((ripple) => (
											<motion.span
												key={ripple.id}
												initial={{
													scale: 0,
													opacity: 0.35,
												}}
												animate={{
													scale: 3,
													opacity: 0,
												}}
												transition={{ duration: 0.5 }}
												className="pointer-events-none absolute rounded-full bg-primary"
												style={{
													left: ripple.x,
													top: ripple.y,
													width: 40,
													height: 40,
													transform:
														'translate(-50%, -50%)',
												}}
											/>
										))}
								</AnimatePresence>

								{/* 2. Active Pill */}
								<AnimatePresence initial={false}>
									{isActive && (
										<motion.div
											layoutId="sidebar-active-pill"
											className="absolute inset-0 -z-10 rounded-xl bg-primary shadow-sm"
											transition={{
												type: 'spring',
												stiffness: 380,
												damping: 34,
											}}
										/>
									)}
								</AnimatePresence>

								<motion.div
									layout
									whileHover={
										reduceMotion
											? {}
											: {
													scale: 1.08,
													rotate: collapsed ? 0 : -4,
												}
									}
									className={cn(
										'flex items-center',
										collapsed ? '' : 'gap-3',
									)}
								>
									{/* 3. Icon */}
									<Icon
										size={22}
										weight={isActive ? 'fill' : 'duotone'}
										className={cn(
											'relative z-10 shrink-0 transition-colors',
											isActive
												? 'text-primary-foreground'
												: 'text-muted-foreground group-hover:text-foreground',
										)}
									/>

									{/* 4. Label */}
									<AnimatePresence initial={false}>
										{!collapsed && (
											<motion.span
												layout
												variants={sidebarLabelVariants}
												initial="hidden"
												animate="visible"
												exit="exit"
												className={cn(
													'relative z-10 truncate text-sm font-medium tracking-tight',
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

								{/* 5. Badge */}
								<AnimatePresence initial={false}>
									{!collapsed && item.badge && (
										<motion.div
											layout
											initial={{
												scale: 0.75,
												opacity: 0,
											}}
											animate={{ scale: 1, opacity: 1 }}
											exit={{ scale: 0.75, opacity: 0 }}
											transition={{ duration: 0.18 }}
											className={cn(
												'relative z-10 rounded-full px-2 py-0.5 text-[11px] font-semibold',
												isActive
													? 'bg-primary-foreground/20 text-primary-foreground'
													: 'bg-muted text-muted-foreground',
											)}
										>
											{item.badge}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</TooltipTrigger>

						{/* Tooltip Content shown ONLY if collapsed */}
						{collapsed && (
							<TooltipContent side="right" sideOffset={12}>
								<p>{item.label}</p>
							</TooltipContent>
						)}
					</Tooltip>
				</motion.div>
			)}
		</NavLink>
	);
});
