// src/layouts/AuthLayout.tsx

import { Outlet } from 'react-router-dom';

import { AuthCard } from '@/components/auth';

export default function AuthLayout() {
	return (
		<AuthCard>
			<Outlet />
		</AuthCard>
	);
}
