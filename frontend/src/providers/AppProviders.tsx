// src/providers/AppProviders.tsx

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';

import { AuthProvider } from '@/features/auth/AuthProvider';

interface AppProvidersProps extends PropsWithChildren {}

export function AppProviders({ children }: AppProvidersProps) {
	return (
		<ThemeProvider>
			<QueryProvider>
				<AuthProvider>{children}</AuthProvider>
			</QueryProvider>
		</ThemeProvider>
	);
}
