// src/routes/route-config.tsx

import type { RouteObject } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';

import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
import { ROUTES } from './route-paths';

export const routes: RouteObject[] = [
	{
		element: <ProtectedRoute />,

		children: [
			{
				element: <AppLayout />,

				children: [
					{
						path: ROUTES.HOME,

						lazy: async () => {
							const module = await import('@/pages/Home');

							return {
								Component: module.default,
							};
						},
					},

					{
						path: ROUTES.WATCH,

						lazy: async () => {
							const module = await import('@/pages/Watch');

							return {
								Component: module.default,
							};
						},
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

						lazy: async () => {
							const module = await import('@/pages/Auth/Login');

							return {
								Component: module.default,
							};
						},
					},

					{
						path: ROUTES.REGISTER,

						lazy: async () => {
							const module =
								await import('@/pages/Auth/Register');

							return {
								Component: module.default,
							};
						},
					},
				],
			},
		],
	},

	{
		path: ROUTES.NOT_FOUND,

		lazy: async () => {
			const module = await import('@/pages/NotFound');

			return {
				Component: module.default,
			};
		},
	},
];
