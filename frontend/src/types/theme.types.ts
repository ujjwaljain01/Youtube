export type Theme = 'light' | 'dark' | 'night' | 'system';

export type ResolvedTheme = Exclude<Theme, 'system'>;

export interface ThemeState {
	theme: Theme;

	resolvedTheme: ResolvedTheme;

	setTheme: (theme: Theme) => void;

	setResolvedTheme: (theme: ResolvedTheme) => void;
}
