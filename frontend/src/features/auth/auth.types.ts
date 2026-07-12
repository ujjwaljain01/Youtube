//src/features/auth/auth.types.ts

import type { RegisterFormValues } from '../auth/validation/register.schema';

export interface ApiResponse<T> {
	statusCode: number;
	success: boolean;
	message: string;
	data: T;
}

export interface AuthUser {
	_id: string;
	fullName: string;
	username: string;
	email: string;
	avatar: string;
	coverImage?: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export type RegisterCredentials = RegisterFormValues;

export interface AuthState {
	user: AuthUser | null;

	isAuthenticated: boolean;

	isLoading: boolean;

	setLoading: (loading: boolean) => void;

	setUser: (user: AuthUser | null) => void;

	login: (user: AuthUser) => void;

	logout: () => void;
}
