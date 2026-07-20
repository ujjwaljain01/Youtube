// src/providers/QueryProvider.tsx

import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,

			refetchOnWindowFocus: false,

			refetchOnReconnect: true,

			staleTime: 1000 * 60 * 5,
		},

		mutations: {
			retry: 1,
		},
	},
});

interface QueryProviderProps extends PropsWithChildren {}

export function QueryProvider({ children }: QueryProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export { queryClient };
