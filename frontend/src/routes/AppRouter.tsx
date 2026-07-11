// src/routes/AppRouter.tsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './route-config';

const router = createBrowserRouter(routes);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
