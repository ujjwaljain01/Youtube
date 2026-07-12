// src/components/navigation/sidebar/SidebarFooter.tsx

import { motion } from 'motion/react';

import { footerNavigation } from '@/data/navigation';

import { SidebarItem } from './SidebarItem';

export function SidebarFooter() {
	return (
		<motion.footer layout className="border-t border-border/60 py-2">
			{footerNavigation.items.map((item) => (
				<SidebarItem key={item.id} item={item} />
			))}
		</motion.footer>
	);
}
