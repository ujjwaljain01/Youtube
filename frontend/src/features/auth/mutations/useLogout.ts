// src/features/auth/mutations/useLogout.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logoutUser } from '../auth.api';
import { authQueryKeys } from '../auth.query-keys';

export function useLogout() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logoutUser,

		onSuccess: async () => {
			await queryClient.removeQueries({
				queryKey: authQueryKeys.currentUser(),
			});

			queryClient.clear();
		},
	});
}
