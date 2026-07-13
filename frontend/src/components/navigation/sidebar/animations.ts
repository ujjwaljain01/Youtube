import type { Transition, Variants } from 'motion/react';

export const SIDEBAR_EASE = [0.22, 1, 0.36, 1] as const;

export const sidebarSpring: Transition = {
	type: 'spring',
	stiffness: 340,
	damping: 30,
	mass: 0.8,
};

export const sidebarFade: Transition = {
	duration: 0.18,
	ease: SIDEBAR_EASE,
};

export const sidebarItemVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -8,
	},

	visible: {
		opacity: 1,
		x: 0,
		transition: sidebarFade,
	},
};

export const sidebarLabelVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -8,
	},

	visible: {
		opacity: 1,
		x: 0,
		transition: sidebarFade,
	},

	exit: {
		opacity: 0,
		x: -8,
		transition: {
			duration: 0.12,
		},
	},
};

export const sidebarGroupVariants: Variants = {
	hidden: {},

	visible: {
		transition: {
			staggerChildren: 0.03,
		},
	},
};
