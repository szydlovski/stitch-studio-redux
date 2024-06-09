import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

const APP_NAME = 'Stitch Studio';
const APP_DEFAULT_TITLE = 'Stitch Studio';
const APP_TITLE_TEMPLATE = '%s - Stitch Studio';
const APP_DESCRIPTION = 'Generate, design & monetize cross stitch patterns';

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
};

export const viewport: Viewport = {
	themeColor: '#FFFFFF',
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
				{children}
			</body>
		</html>
	);
}
