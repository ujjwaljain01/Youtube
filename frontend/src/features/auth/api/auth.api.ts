// src/features/auth/api/auth.api.ts

import { apiClient } from '@/api';

interface RefreshTokenResponse {
	statusCode: number;
	data: {
		accessToken: string;
		refreshToken?: string;
	};
	message: string;
	success: boolean;
}

export const refreshAccessToken = async () => {
	const { data } = await apiClient.post<RefreshTokenResponse>(
		'/users/refresh-token',
	);

	return data.data;
};
