// src/features/auth/mutations/useRegister.ts

import { useMutation } from '@tanstack/react-query';

import { registerUser } from '../auth.api';

export function useRegister() {
	return useMutation({
		mutationFn: registerUser,
	});
}
