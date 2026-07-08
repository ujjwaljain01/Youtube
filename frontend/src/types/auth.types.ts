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

	accessToken: string | null;

	isAuthenticated: boolean;

	setUser: (user: AuthUser | null) => void;

	setAccessToken: (token: string | null) => void;

	login: (payload: { user: AuthUser; accessToken: string }) => void;

	logout: () => void;
}
