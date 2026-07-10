// src/routes/route-config.tsx

import { lazy } from 'react';

import { ROUTES } from './route-paths';

import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';

import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

const HomePage = lazy(() => import('@/pages/Home'));

const LoginPage = lazy(() => import('@/pages/Auth/Login'));

const RegisterPage = lazy(() => import('@/pages/Auth/Register'));

const NotFoundPage = lazy(() => import('@/pages/NotFound'));

export const routes = [
	{
		element: <ProtectedRoute />,

		children: [
			{
				element: <AppLayout />,

				children: [
					{
						path: ROUTES.HOME,

						element: <HomePage />,
					},
				],
			},
		],
	},

	{
		element: <GuestRoute />,

		children: [
			{
				element: <AuthLayout />,

				children: [
					{
						path: ROUTES.LOGIN,

						element: <LoginPage />,
					},

					{
						path: ROUTES.REGISTER,

						element: <RegisterPage />,
					},
				],
			},
		],
	},

	{
		path: ROUTES.NOT_FOUND,

		element: <NotFoundPage />,
	},
];
