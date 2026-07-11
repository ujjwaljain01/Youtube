// src/features/auth/mutations/useLogin.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { loginUser } from '../auth.api';
import { authQueryKeys } from '../auth.query-keys';

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: loginUser,

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: authQueryKeys.currentUser(),
			});
		},
	});
}
