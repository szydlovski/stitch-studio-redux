'use client';
import Link from 'next/link';

import { cn } from '@/lib';
import { usePathname } from 'next/navigation';
import { MENU_LINKS } from '../links';

export const Sidebar = () => {
	const pathname = usePathname();
	return (
		<div className="hidden border-r bg-muted/40 md:block h-full">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link href="/" className="flex items-center gap-2 font-semibold">
						<span className="">StitchStudio</span>
					</Link>
				</div>
				<div className="flex-1">
					<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
						{MENU_LINKS.map(({ label, href, icon: Icon }) => (
							<Link
								href={href}
								key={label + href}
								className={cn(
									'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
									{
										'text-primary': pathname.startsWith(href),
										'bg-muted': pathname.startsWith(href),
										'text-muted-foreground': !pathname.startsWith(href),
									}
								)}
							>
								<Icon className="h-4 w-4" />
								{label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
};
