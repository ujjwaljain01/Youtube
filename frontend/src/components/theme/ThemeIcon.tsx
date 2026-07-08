import { MoonIcon, SunDimIcon, DesktopIcon } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';

import { useTheme } from '@/hooks/use-theme';

export function ThemeIcon() {
	const { theme, resolvedTheme } = useTheme();

	const icon =
		theme === 'system' ? (
			<DesktopIcon weight="duotone" size={20} />
		) : resolvedTheme === 'dark' ? (
			<MoonIcon weight="fill" size={20} />
		) : (
			<SunDimIcon weight="fill" size={20} />
		);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={`${theme}-${resolvedTheme}`}
				initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
				animate={{ rotate: 0, opacity: 1, scale: 1 }}
				exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
				transition={{
					duration: 0.2,
				}}
			>
				{icon}
			</motion.div>
		</AnimatePresence>
	);
}
