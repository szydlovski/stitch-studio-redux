'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { MobileMenu } from './components/MobileMenu';
import { UserMenu } from '../UserMenu/UserMenu';

import React from 'react';
import { CommandToolbarItem } from '@components/CommandMenu';
import { MENU_LINKS } from '../links';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui';
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
		<nav className="hidden md:flex items-start text-sm font-medium p-2 gap-6">
			{MENU_LINKS.map(({ label, href, icon: Icon }) => {
				const isActive = pathname.startsWith(href);
				return (
					<Link
						key={href}
						href={href}
						className={cn(
							'flex justify-center items-center gap-1 rounded-full transition-all text-muted-foreground h-10 opacity-80',
							{
								'text-primary opacity-100': isActive,
							}
						)}
					>
						<Icon size={18} className={cn(isActive && 'text-violet-600')} />
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
		<header className="shrink-0 border-b bg-muted/40">
			<div className="h-14 max-w-screen-2xl w-full mx-auto flex items-center gap-6 pr-6 px-6">
				<HeaderLogo />
				<HeaderNav />
				<CommandToolbarItem />
				<UserMenu />
				<MobileMenu />
			</div>
		</header>
	);
};

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
		<div className="grid grid-rows-[56px_1fr] h-screen w-full max-h-screen">
			<Header />
			<main className="flex-1">{children}</main>
		</div>
	);
};
