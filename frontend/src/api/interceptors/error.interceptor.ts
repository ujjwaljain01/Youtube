// src/api/interceptors/error.interceptor.ts

import type { AxiosError } from 'axios';

import { apiClient } from '../axios';
import type { RetryAxiosRequestConfig } from '../types';

import { refreshAccessToken } from '@/features/auth/auth.api';
import { useAuthStore } from '@/features/auth/auth.store';

let refreshPromise: Promise<void> | null = null;

export async function authErrorInterceptor(error: AxiosError) {
	const originalRequest = error.config as RetryAxiosRequestConfig;

	if (!originalRequest) {
		return Promise.reject(error);
	}

	// Don't retry refresh endpoint itself
	if (originalRequest.url?.includes('/users/refresh-token')) {
		return Promise.reject(error);
	}

	if (error.response?.status !== 401 || originalRequest._retry) {
		return Promise.reject(error);
	}

	originalRequest._retry = true;

	try {
		if (!refreshPromise) {
			refreshPromise = refreshAccessToken().finally(() => {
				refreshPromise = null;
			});
		}

		await refreshPromise;

		// Browser now has the new accessToken cookie.
		// Retry original request.
		return apiClient(originalRequest);
	} catch (err) {
		useAuthStore.getState().logout();

		return Promise.reject(err);
	}
}
