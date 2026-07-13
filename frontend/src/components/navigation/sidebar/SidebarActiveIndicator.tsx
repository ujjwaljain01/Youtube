import { motion } from 'motion/react';

import { sidebarSpring } from './animations';

export function SidebarActiveIndicator() {
	return (
		<motion.div
			layoutId="sidebar-active-pill"
			className="
absolute
inset-0
rounded-xl
bg-primary
shadow-sm
"
			transition={sidebarSpring}
		/>
	);
}
