import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ClientProviders } from './providers';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
	title: 'Stitch Studio',
	description: 'Generate, design & monetize cross stitch patterns',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	params: {};
}>) {
	const queryClient = useMemo(() => new QueryClient(), []);
	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.className
				)}
			>
				<ClientProviders>{children}</ClientProviders>
			</body>
		</html>
	);
}
