'use client';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useMemo } from 'react';

export const ClientProviders = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const queryClient = useMemo(() => new QueryClient(), []);
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<TooltipProvider>{children}</TooltipProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
};
