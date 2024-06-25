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

export const Header = () => {
	const pathname = usePathname();
	return (
		<header className="flex h-14 shrink-0 items-center gap-4 border-b bg-muted/40 pr-6 pl-0">
			<div className="flex h-full w-14 border-r justify-center items-center">
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
			<nav className="hidden md:flex items-start text-sm font-medium p-2 gap-4">
				{MENU_LINKS.map(({ label, href, icon: Icon }) => {
					const isActive = pathname.startsWith(href);
					return (
						<Tooltip key={href} delayDuration={300}>
							<TooltipTrigger asChild>
								<Link
									href={href}
									className={cn(
										'flex justify-center items-center gap-1.5 rounded-full transition-all text-muted-foreground h-10 opacity-100',
										{
											'text-primary opacity-100': isActive,
										}
									)}
								>
									<Icon
										className={cn('h-4 w-4', {
											'text-violet-600': isActive,
										})}
									/>
									<span className="text-xs">{label}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="bottom">{label}</TooltipContent>
						</Tooltip>
					);
				})}
			</nav>
			<CommandToolbarItem />
			<UserMenu />
			<MobileMenu />
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
