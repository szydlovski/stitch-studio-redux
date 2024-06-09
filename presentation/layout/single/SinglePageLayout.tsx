'use client';

import { UserMenu } from '@/components/UserMenu/UserMenu';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useEffect } from 'react';

export interface SinglePageLayoutProps {
	header: string;
	children: ReactNode;
}

export const SinglePageLayout = ({
	header,
	children,
}: SinglePageLayoutProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const session = useSession();
	useEffect(() => {
		if (session.status === 'unauthenticated') {
			router.push('/login');
		}
	}, [pathname, router, session]);
	return session.status === 'unauthenticated' ? (
		<>Loading...</>
	) : (
		<div className="flex h-screen flex-col max-h-full">
			<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
				<Button asChild variant="ghost" size="icon" className="rounded-full">
					<Link href="/studio">
						<ArrowLeftIcon />
					</Link>
				</Button>

				<span className="text-lg font-semibold">{header}</span>
				<div className="flex items-center ml-auto">
					<UserMenu />
				</div>
			</header>
			<main className="flex-1 flex-col h-full overflow-auto">{children}</main>
		</div>
	);
};
