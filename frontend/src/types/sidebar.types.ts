export interface SidebarState {
    collapsed: boolean;

    mobileOpen: boolean;

    toggleSidebar: () => void;

    collapseSidebar: () => void;

    expandSidebar: () => void;

    openMobileSidebar: () => void;

    closeMobileSidebar: () => void;

    toggleMobileSidebar: () => void;
}