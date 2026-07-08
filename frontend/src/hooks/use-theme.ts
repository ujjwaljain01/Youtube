import { useThemeStore } from '@/store/theme.store';

export function useTheme() {
	const store = useThemeStore();

	return {
		...store,

		isDark: store.resolvedTheme === 'dark',

		isLight: store.resolvedTheme === 'light',

		isSystem: store.theme === 'system',
	};
}
