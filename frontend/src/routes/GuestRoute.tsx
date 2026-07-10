// src/routes/GuestRoute.tsx

import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from './route-paths';

import { useAuthStore } from '@/features/auth/auth.store';

export default function GuestRoute() {
	const { isAuthenticated, isLoading } = useAuthStore();

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
