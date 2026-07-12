// src/store/sidebar.store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarStore {
	collapsed: boolean;
	mobileOpen: boolean;

	setCollapsed: (collapsed: boolean) => void;
	toggleSidebar: () => void;

	openMobileSidebar: () => void;
	closeMobileSidebar: () => void;
	toggleMobileSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
	persist(
		(set, get) => ({
			collapsed: false,

			mobileOpen: false,

			setCollapsed: (collapsed) =>
				set({
					collapsed,
				}),

			toggleSidebar: () =>
				set({
					collapsed: !get().collapsed,
				}),

			openMobileSidebar: () =>
				set({
					mobileOpen: true,
				}),

			closeMobileSidebar: () =>
				set({
					mobileOpen: false,
				}),

			toggleMobileSidebar: () =>
				set({
					mobileOpen: !get().mobileOpen,
				}),
		}),
		{
			name: 'novaplay-sidebar',

			partialize: (state) => ({
				collapsed: state.collapsed,
			}),
		},
	),
);
