import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

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
	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.className
				)}
			>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
