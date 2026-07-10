export const ROUTES = {
	HOME: '/',

	WATCH: '/watch/:videoId',

	LOGIN: '/login',

	REGISTER: '/register',

	CHANNEL: '/channel/:username',

	HISTORY: '/history',

	PLAYLISTS: '/playlists',

	LIKED: '/liked',

	SUBSCRIPTIONS: '/subscriptions',

	PROFILE: '/profile',

	SETTINGS: '/settings',

	SEARCH: '/search',
    
	NOT_FOUND: '*',
} as const;
