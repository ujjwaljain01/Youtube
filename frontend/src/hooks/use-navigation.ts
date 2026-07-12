// hooks/useNavigation.ts

import { useAuthStore } from '@/features/auth/auth.store';
import { authenticatedNavigation, guestNavigation } from '@/data/navigation';

export function useNavigation() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return isAuthenticated ? authenticatedNavigation : guestNavigation;
}
