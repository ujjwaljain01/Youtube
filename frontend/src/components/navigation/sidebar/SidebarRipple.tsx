import { motion } from 'motion/react';

export function SidebarRipple() {
	return (
		<motion.div
			initial={{
				scale: 0,
				opacity: 0.25,
			}}
			animate={{
				scale: 2.4,
				opacity: 0,
			}}
			exit={{
				opacity: 0,
			}}
			transition={{
				duration: 0.45,
			}}
			className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 pointer-events-none"
		/>
	);
}
