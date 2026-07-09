// src/features/auth/types/auth.types.ts

export interface AuthUser {
	_id: string;
	fullName: string;
	username: string;
	email: string;
	avatar: string;
	coverImage?: string;
}

export interface AuthState {
	user: AuthUser | null;

	isAuthenticated: boolean;

	isLoading: boolean;

	setLoading: (loading: boolean) => void;

	setUser: (user: AuthUser | null) => void;

	login: (user: AuthUser) => void;

	logout: () => void;
}
