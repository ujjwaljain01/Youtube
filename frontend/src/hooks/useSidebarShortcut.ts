// src/hooks/useSidebarShortcut.ts

import { useEffect } from 'react';

import { useToggleSidebar } from '@/store/sidebar.selector';

export function useSidebarShortcut() {
	const toggleSidebar = useToggleSidebar();

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
				e.preventDefault();

				toggleSidebar();
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [toggleSidebar]);
}
