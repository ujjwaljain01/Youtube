//src/routes/route-config.tsx

import type { RouteObject } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout';

import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from './route-paths';

export const routes: RouteObject[] = [
    // -----------------------
    // Public Routes
    // -----------------------
    {
        element: <AppLayout />,
        children: [
            {
                path: ROUTES.HOME,
                lazy: async () => {
                    const module = await import('@/pages/HomePage');
                    return { Component: module.default };
                },
            },
            {
                path: ROUTES.WATCH,
                lazy: async () => {
                    const module = await import('@/pages/WatchPage');
                    return { Component: module.default };
                },
            },
        ],
    },

    // -----------------------
    // Protected Routes
    // -----------------------
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    // history
                    // playlists
                    // upload
                    // settings
                ],
            },
        ],
    },

    // -----------------------
    // Guest Routes
    // -----------------------
    {
        element: <GuestRoute />,
        children: [
            {
                path: ROUTES.LOGIN,
                lazy: async () => {
                    const module = await import('@/pages/Auth/Login');
                    return { Component: module.default };
                },
            },
            {
                path: ROUTES.REGISTER,
                lazy: async () => {
                    const module = await import('@/pages/Auth/Register');
                    return { Component: module.default };
                },
            },
        ],
    },

    {
        path: ROUTES.NOT_FOUND,
        lazy: async () => {
            const module = await import('@/pages/NotFound');
            return { Component: module.default };
        },
    },
];