'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Suspense, useMemo } from 'react';
import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';
import { TooltipProvider } from '@components/ui';
import { ThemeProvider } from '@components/ThemeProvider';

export const ClientProviders = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
					},
				},
			}),
		[]
	);
	return (
		<Suspense fallback={<>Fatal Error</>}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<QueryParamProvider adapter={NextAdapterApp}>
					<QueryClientProvider client={queryClient}>
						<SessionProvider>
							<TooltipProvider>{children}</TooltipProvider>
						</SessionProvider>
					</QueryClientProvider>
				</QueryParamProvider>
			</ThemeProvider>
		</Suspense>
	);
};
