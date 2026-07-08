import type { Theme } from '@/types/theme.types';

export const STORAGE_KEY = 'NovaPlay-theme';

export function getSystemTheme(): 'light' | 'dark' {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
	if (theme === 'system') {
		return getSystemTheme();
	}

	return theme;
}

export function applyTheme(theme: 'light' | 'dark') {
	const root = document.documentElement;

	root.classList.remove('light', 'dark');

	root.classList.add(theme);
}
