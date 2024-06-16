'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useMemo } from 'react';
import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';
import { TooltipProvider } from '@components/ui';

export const ClientProviders = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const queryClient = useMemo(() => new QueryClient(), []);
	return (
		<QueryParamProvider adapter={NextAdapterApp}>
			<QueryClientProvider client={queryClient}>
				<SessionProvider>
					<TooltipProvider>{children}</TooltipProvider>
				</SessionProvider>
			</QueryClientProvider>
		</QueryParamProvider>
	);
};
