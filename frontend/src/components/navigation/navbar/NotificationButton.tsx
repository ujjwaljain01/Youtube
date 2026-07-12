import { BellIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

import { motion } from 'motion/react';

export function NotificationButton() {
	return (
		<motion.div
			whileHover={{
				scale: 1.05,
			}}
			whileTap={{
				scale: 0.9,
			}}
		>
			<Button variant="ghost" size="icon">
				<BellIcon size={20} />
			</Button>
		</motion.div>
	);
}
