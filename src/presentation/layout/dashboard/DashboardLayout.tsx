'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { MobileMenu } from './components/MobileMenu';
import { Sidebar } from './components/Sidebar';
import { UserMenu } from '../UserMenu/UserMenu';

import React from 'react';
import { CommandToolbarItem } from '@components/CommandMenu';

export const Header = () => (
	<header className="flex h-14 shrink-0 items-center gap-4 border-b bg-muted/40 px-6">
		<CommandToolbarItem />
		<UserMenu />
		<MobileMenu />
	</header>
);

interface ContainerProps {
	children?: React.ReactNode;
}



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
		<div className="grid h-screen w-full sm:grid-cols-[56px_1fr]">
			{/* <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"> */}
			<Sidebar />
			<div className="flex flex-col max-h-screen">
				<Header />
				<main className="flex-1">{children}</main>
			</div>
		</div>
	);
};
