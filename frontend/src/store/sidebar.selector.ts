import { useSidebarStore } from './sidebar.store';

export const useSidebarCollapsed = () =>
	useSidebarStore((state) => state.collapsed);

export const useMobileSidebarOpen = () =>
	useSidebarStore((state) => state.mobileOpen);

export const useToggleSidebar = () =>
	useSidebarStore((state) => state.toggleSidebar);

export const useToggleMobileSidebar = () =>
	useSidebarStore((state) => state.toggleMobileSidebar);

export const useCloseMobileSidebar = () =>
	useSidebarStore((state) => state.closeMobileSidebar);

export const useOpenMobileSidebar = () =>
	useSidebarStore((state) => state.openMobileSidebar);
