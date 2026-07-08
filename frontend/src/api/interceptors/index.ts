// src/api/interceptors/index.ts

import { api } from '../axios';

import { authRequestInterceptor } from './auth.interceptor';
import { authErrorInterceptor } from './error.interceptor';

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use((response) => response, authErrorInterceptor);
