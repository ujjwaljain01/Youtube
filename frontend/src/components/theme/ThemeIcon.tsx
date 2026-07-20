// src/components/theme/ThemeIcon.tsx
import { MoonIcon, SunDimIcon, DesktopIcon, MoonStarsIcon } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeIcon() {
    const { theme, resolvedTheme } = useTheme();

    // Determine the correct icon and animation key based on current state
    const getIconData = () => {
        if (theme === 'system') {
            return { key: 'system', component: <DesktopIcon weight="duotone" size={20} /> };
        }
        if (theme === 'night' || resolvedTheme === 'night') {
            return { key: 'night', component: <MoonStarsIcon weight="fill" size={20} /> };
        }
        if (theme === 'dark' || resolvedTheme === 'dark') {
            return { key: 'dark', component: <MoonIcon weight="fill" size={20} /> };
        }
        return { key: 'light', component: <SunDimIcon weight="fill" size={20} /> };
    };

    const { key, component } = getIconData();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={key}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center text-foreground"
            >
                {component}
            </motion.div>
        </AnimatePresence>
    );
}