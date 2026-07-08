// hooks/useNavigation.ts

import { useAuthStore } from '@/store/auth.store';
import { authenticatedNavigation, guestNavigation } from '@/data/navigation';

export function useNavigation() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return isAuthenticated ? authenticatedNavigation : guestNavigation;
}
