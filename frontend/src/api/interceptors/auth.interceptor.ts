// src/api/interceptors/auth.interceptor.ts

import type { InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/features/auth/store/auth.store';

export function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	const token = useAuthStore.getState().accessToken;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
}
