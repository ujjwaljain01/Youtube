// src/routes/ProtectedRoute.tsx

import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from './route-paths';

import { useAuthStore } from '@/features/auth/auth.store';

export default function ProtectedRoute() {
	const { isAuthenticated, isLoading } = useAuthStore();

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				Loading...
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	return <Outlet />;
}