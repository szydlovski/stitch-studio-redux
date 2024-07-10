'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { MobileMenu } from './components/MobileMenu';
import { UserMenu } from '../UserMenu/UserMenu';

import React, { ReactNode, useEffect } from 'react';
import { CommandToolbarItem } from '@components/CommandMenu';
import { MENU_LINKS } from '../links';
import Link from 'next/link';
import { cn } from '@lib/utils';
import Image from 'next/image';

export const HeaderLogo = () => {
	return (
		<div className="flex h-full items-center gap-2">
			<div className="flex h-full justify-center items-center">
				<Link href="/">
					<Image
						className="w-6 h-6 hover:scale-125 transition-all"
						src="/icon-sm.png"
						alt="StitchStudio"
						width={48}
						height={48}
					/>
				</Link>
			</div>
			<span className="tracking-tighter font-semibold">Stitch Studio</span>
		</div>
	);
};

export const HeaderNav = () => {
	const pathname = usePathname();
	return (
		<nav className="hidden sm:flex items-start text-sm font-medium gap-4 lg:gap-6 xl:gap-8">
			{MENU_LINKS.map(({ label, href, icon: Icon }) => {
				const isActive = pathname.startsWith(href);
				return (
					<Link
						key={href}
						href={href}
						className={cn(
							'flex justify-center items-center gap-1 rounded-full transition-all text-muted-foreground opacity-80',
							{
								'text-primary opacity-100': isActive,
							}
						)}
					>
						<Icon className={cn('w-4 h-4', isActive && 'text-violet-600')} />
						<span className="text-sm tracking-tighter">{label}</span>
					</Link>
				);
			})}
		</nav>
	);
};

export const Header = () => {
	const pathname = usePathname();
	return (
		<header className="border-b bg-muted/40">
			<div
				className={cn(
					'max-w-screen-2xl w-full mx-auto flex items-center gap-4 lg:gap-6 xl:gap-8 px-md py-sm'
				)}
			>
				<HeaderLogo />
				<HeaderNav />
				<div className="flex items-center gap-4 lg:gap-6 xl:gap-8 ml-auto">
					<div className="flex gap-2">
						<CommandToolbarItem />
						<MobileMenu />
					</div>
					<UserMenu />
				</div>
			</div>
		</header>
	);
};

interface ContainerProps {
	children?: React.ReactNode;
}

export const AuthGuard = ({
	children,
	loadingContent,
}: {
	children?: ReactNode;
	loadingContent?: ReactNode;
}) => {
	const router = useRouter();
	const session = useSession();
	useEffect(() => {
		if (session.status === 'unauthenticated') {
			router.push('/login');
		}
	}, [router, session]);
	return session.status === 'authenticated' ? children : loadingContent;
};

export const DashboardLayout = ({ children }: ContainerProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const session = useSession();

	useEffect(() => {
		if (session.status === 'unauthenticated') {
			router.push('/login');
		}
	}, [pathname, router, session]);
	return (
		<AuthGuard loadingContent={<>Loading</>}>
			<div className="flex flex-col h-screen w-full max-h-screen">
				<Header />
				<main className="flex-1">{children}</main>
			</div>
		</AuthGuard>
	);
};
