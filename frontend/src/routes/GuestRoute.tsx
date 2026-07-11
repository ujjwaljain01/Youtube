// src/routes/GuestRoute.tsx

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/auth.store';

import { ROUTES } from './route-paths';

export default function GuestRoute() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const isLoading = useAuthStore((state) => state.isLoading);

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				Loading...
			</div>
		);
	}

	if (isAuthenticated) {
		return <Navigate to={ROUTES.HOME} replace />;
	}

	return <Outlet />;
}
