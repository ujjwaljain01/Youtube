// src/features/auth/AuthProvider.tsx

import type { PropsWithChildren } from 'react';

import { useInitializeAuth } from './useInitializeAuth';
import { useAuthStore } from './auth.store';

interface AuthProviderProps extends PropsWithChildren {}

export function AuthProvider({ children }: AuthProviderProps) {
	useInitializeAuth();

	const isLoading = useAuthStore((state) => state.isLoading);

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				Loading...
			</div>
		);
	}

	return children;
}
