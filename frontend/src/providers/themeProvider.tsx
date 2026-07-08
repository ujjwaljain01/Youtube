import { useEffect } from 'react';

import { useThemeStore } from '@/store/theme.store';

import { applyTheme, resolveTheme } from '@/lib/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const { theme, setResolvedTheme } = useThemeStore();

	useEffect(() => {
		const updateTheme = () => {
			const resolved = resolveTheme(theme);

			applyTheme(resolved);

			setResolvedTheme(resolved);
		};

		updateTheme();

		const media = window.matchMedia('(prefers-color-scheme: dark)');

		if (theme === 'system') {
			media.addEventListener('change', updateTheme);
		}

		media.addEventListener('change', updateTheme);

		return () => media.removeEventListener('change', updateTheme);
	}, [theme, setResolvedTheme]);

	return children;
}
