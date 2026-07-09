// src/features/auth/api/auth.api.ts

import { apiClient } from '@/api';

import type { ApiResponse } from '@/types/video.types';
import type { AuthUser } from '@/features/auth/auth.types';

export const refreshAccessToken = async () => {
	const { data } = await apiClient.post<ApiResponse<null>>(
		'/users/refresh-token',
	);

	return data;
};

export const getCurrentUser = async () => {
	const { data } = await apiClient.get<ApiResponse<AuthUser>>(
		'/users/current-user',
	);

	return data.data;
};
