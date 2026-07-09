// src/api/interceptors/auth.interceptor.ts

import type { InternalAxiosRequestConfig } from 'axios';

export function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	return config;
}
