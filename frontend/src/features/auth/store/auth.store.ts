// src/features/auth/store/auth.store.ts

import { create } from 'zustand';

import type { AuthState } from '@/types/auth.types';

export const useAuthStore = create<AuthState>((set) => ({
	user: null,

	accessToken: null,

	isAuthenticated: false,

	setUser: (user) =>
		set({
			user,
			isAuthenticated: !!user,
		}),

	setAccessToken: (accessToken) =>
		set({
			accessToken,
		}),

	login: ({ user, accessToken }) =>
		set({
			user,
			accessToken,
			isAuthenticated: true,
		}),

	logout: () =>
		set({
			user: null,
			accessToken: null,
			isAuthenticated: false,
		}),
}));
