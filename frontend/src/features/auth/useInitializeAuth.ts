import { useEffect } from 'react';
import { useCurrentUser } from './useCurrentUser';
import { useAuthStore } from './auth.store';

export function useInitializeAuth() {
	// Grab the 'status' string ('pending' | 'success' | 'error') for cleaner dependency tracking
	const { data: user, status } = useCurrentUser();

	const login = useAuthStore((state) => state.login);
	const logout = useAuthStore((state) => state.logout);
	const setLoading = useAuthStore((state) => state.setLoading);

	useEffect(() => {
		// Wait until the initial network request is completely done
		if (status === 'pending') return;

		if (status === 'success' && user) {
			login(user);
		} else {
			logout();
		}

		setLoading(false);
	}, [status, user, login, logout, setLoading]);
}
