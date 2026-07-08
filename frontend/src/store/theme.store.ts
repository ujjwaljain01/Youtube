import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ThemeState } from '@/types/theme.types';

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			theme: 'system',

			resolvedTheme: 'light',

			setTheme: (theme) => set({ theme }),

			setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
		}),
		{
			name: 'NovaPlay-theme',
		},
	),
);
