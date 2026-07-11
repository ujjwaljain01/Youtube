// src/features/auth/auth.api.ts

import { apiClient } from '@/api';

import type {
	ApiResponse,
	AuthUser,
	LoginCredentials,
	RegisterCredentials,
} from './auth.types';

export async function loginUser(payload: LoginCredentials) {
	const { data } = await apiClient.post<
		ApiResponse<{
			user: AuthUser;
		}>
	>('/users/login', payload);

	return data.data;
}

export async function registerUser(payload: RegisterCredentials) {
	const formData = new FormData();

	formData.append('fullName', payload.fullName);
	formData.append('username', payload.username);
	formData.append('email', payload.email);
	formData.append('password', payload.password);

	formData.append('avatar', payload.avatar);

	if (payload.coverImage) {
		formData.append('coverImage', payload.coverImage);
	}

	const { data } = await apiClient.post<ApiResponse<AuthUser>>(
		'/users/register',
		formData,
	);

	return data.data;
}

export async function logoutUser() {
	await apiClient.post('/users/logout');
}

export async function refreshAccessToken() {
	await apiClient.post('/users/refresh-token');
}

export async function getCurrentUser() {
	const { data } = await apiClient.get<ApiResponse<AuthUser>>(
		'/users/current-user',
	);

	return data.data;
}
