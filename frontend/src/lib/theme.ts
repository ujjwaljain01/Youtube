// src/lib/theme.ts
import type { Theme } from '@/types/theme.types';

export const STORAGE_KEY = 'NovaPlay-theme';

export function getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

// Update this to allow 'night' to pass through
export function resolveTheme(theme: Theme): 'light' | 'dark' | 'night' {
    if (theme === 'system') {
        return getSystemTheme();
    }
    return theme as 'light' | 'dark' | 'night';
}

// Ensure 'night' is removed and added correctly
export function applyTheme(theme: 'light' | 'dark' | 'night') {
    const root = document.documentElement;

    // Remove ALL possible theme classes
    root.classList.remove('light', 'dark', 'night');
    
    // Add the newly resolved theme class
    root.classList.add(theme);
    
    // Also set data-theme if you want broader ecosystem compatibility
    root.setAttribute('data-theme', theme);
}