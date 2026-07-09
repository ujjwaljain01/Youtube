// src/features/auth/store/auth.store.ts

import { create } from 'zustand';

import type { AuthState } from '@/features/auth/auth.types';

export const useAuthStore = create<AuthState>((set) => ({
	user: null,

	isAuthenticated: false,

	isLoading: true,

	setLoading: (loading) =>
		set({
			isLoading: loading,
		}),

	setUser: (user) =>
		set({
			user,
			isAuthenticated: !!user,
		}),

	login: (user) =>
		set({
			user,
			isAuthenticated: true,
			isLoading: false,
		}),

	logout: () =>
		set({
			user: null,
			isAuthenticated: false,
			isLoading: false,
		}),
}));
