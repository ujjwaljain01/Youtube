import { useEffect } from 'react';

import { useCurrentUser } from './useCurrentUser';
import { useAuthStore } from './auth.store';

export function useInitializeAuth() {
	const login = useAuthStore((state) => state.login);
	const logout = useAuthStore((state) => state.logout);
	const setLoading = useAuthStore((state) => state.setLoading);

	const { data: user, isLoading, isSuccess, isError } = useCurrentUser();

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading, setLoading]);

	useEffect(() => {
		if (isSuccess && user) {
			login(user);
			return;
		}

		if (isError) {
			logout();
		}
	}, [isSuccess, isError, user, login, logout]);
}
