// src/routes/AppRouter.tsx

import { Suspense } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './route-config';

const router = createBrowserRouter(routes);

export default function AppRouter() {
	return (
		<Suspense
			fallback={
				<div className="flex h-screen items-center justify-center">
					Loading...
				</div>
			}
		>
			<RouterProvider router={router} />
		</Suspense>
	);
}
