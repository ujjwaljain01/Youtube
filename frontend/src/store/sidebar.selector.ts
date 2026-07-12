// src/store/sidebar.selector.ts

import { useSidebarStore } from './sidebar.store';

export const useSidebarCollapsed = () =>
	useSidebarStore((state) => state.collapsed);

export const useSidebarMobileOpen = () =>
	useSidebarStore((state) => state.mobileOpen);

export const useToggleSidebar = () =>
	useSidebarStore((state) => state.toggleSidebar);

export const useSetSidebarCollapsed = () =>
	useSidebarStore((state) => state.setCollapsed);

export const useOpenSidebar = () =>
	useSidebarStore((state) => state.openMobileSidebar);

export const useCloseSidebar = () =>
	useSidebarStore((state) => state.closeMobileSidebar);

export const useToggleMobileSidebar = () =>
	useSidebarStore((state) => state.toggleMobileSidebar);
