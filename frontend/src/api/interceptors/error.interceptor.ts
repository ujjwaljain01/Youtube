// src/api/interceptors/error.interceptor.ts

import type { AxiosError } from 'axios';

import { apiClient } from '../axios';

import type { RetryAxiosRequestConfig } from '../types';

import { refreshAccessToken } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/features/auth/store/auth.store';

let refreshPromise: Promise<string> | null = null;

export async function authErrorInterceptor(error: AxiosError) {
	const originalRequest = error.config as RetryAxiosRequestConfig;

	if (!originalRequest) {
		return Promise.reject(error);
	}

	if (error.response?.status !== 401 || originalRequest._retry) {
		return Promise.reject(error);
	}

	originalRequest._retry = true;

	try {
		if (!refreshPromise) {
			refreshPromise = refreshAccessToken()
				.then(({ accessToken }) => {
					useAuthStore.getState().setAccessToken(accessToken);

					return accessToken;
				})
				.finally(() => {
					refreshPromise = null;
				});
		}

		const accessToken = await refreshPromise;

		originalRequest.headers.Authorization = `Bearer ${accessToken}`;

		return apiClient(originalRequest);
	} catch (err) {
		useAuthStore.getState().logout();

		return Promise.reject(err);
	}
}
