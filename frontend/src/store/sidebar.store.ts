// src/store/sidebar.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SidebarState } from '@/types/sidebar.types';

export const useSidebarStore = create<SidebarState>()(
	persist(
		(set) => ({
			collapsed: false,

			mobileOpen: false,

			toggleSidebar: () =>
				set((state) => ({
					collapsed: !state.collapsed,
				})),

			collapseSidebar: () =>
				set({
					collapsed: true,
				}),

			expandSidebar: () =>
				set({
					collapsed: false,
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
				set((state) => ({
					mobileOpen: !state.mobileOpen,
				})),
		}),
		{
			name: 'NovaPlay-sidebar',

			partialize: (state) => ({
				collapsed: state.collapsed,
			}),
		},
	),
);
