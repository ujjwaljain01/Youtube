export const API = {
	auth: {
		login: '/users/login',
		logout: '/users/logout',
		register: '/users/register',
		currentUser: '/users/current-user',
		refresh: '/users/refresh-token',
	},

	videos: {
		all: '/videos',
		byId: (id: string) => `/videos/${id}`,
		search: '/videos/search',
	},

	tweets: {
		all: '/tweets',
		byId: (id: string) => `/tweets/${id}`,
	},
};
