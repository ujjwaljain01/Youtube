// src/api/interceptors/index.ts

import { apiClient } from '../axios';

import { authRequestInterceptor } from './auth.interceptor';
import { authErrorInterceptor } from './error.interceptor';

apiClient.interceptors.request.use(authRequestInterceptor);

apiClient.interceptors.response.use(
	(response) => response,
	authErrorInterceptor,
);
