'use client';

import { ContainerProps } from '@/lib/types';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
import { Sidebar } from './Sidebar';
import { UserMenu } from './UserMenu';

import React from 'react';
import { CommandMenu } from '../../CommandMenu';

export const Header = () => (
	<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
		<CommandMenu />
		<UserMenu />
		<MobileMenu />
	</header>
);

export const DashboardLayout = ({ children }: ContainerProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const session = useSession();
	React.useEffect(() => {
		if (session.status === 'unauthenticated') {
			router.push('/login');
		}
	}, [pathname, router, session]);

	return session.status === 'unauthenticated' ? (
		<>Loading</>
	) : (
		<div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<Sidebar />
			<div className="flex flex-col max-h-full overflow-auto">
				<Header />
				<main className="flex-1 h-full overflow-auto">{children}</main>
			</div>
		</div>
	);
};
