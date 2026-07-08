import { motion } from 'motion/react';

import {
	DropdownMenu,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { ThemeIcon } from './ThemeIcon';
import { ThemeMenu } from './ThemeMenu';

export function ThemeToggle() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="icon-button icon-button-md"
				>
					<motion.div
						whileTap={{ scale: 0.85 }}
						whileHover={{ rotate: 15 }}
					>
						<ThemeIcon />
					</motion.div>
				</Button>
			</DropdownMenuTrigger>

			<ThemeMenu />
		</DropdownMenu>
	);
}
