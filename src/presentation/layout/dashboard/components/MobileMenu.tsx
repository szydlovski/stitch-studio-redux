'use client';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import { Sheet, SheetContent, SheetTrigger, Button } from '@components/ui';
import { cn } from '@lib/utils';
import { usePathname } from 'next/navigation';
import { MENU_LINKS } from '../../links';

export const MobileMenu = () => {
	const pathname = usePathname();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="shrink-0 sm:hidden">
					<Menu className="h-4 w-4" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="flex flex-col">
				<nav className="grid gap-2 text-lg font-medium">
					<Link
						href="#"
						className="flex items-center gap-2 text-lg font-semibold"
					>
						<span>StitchStudio</span>
					</Link>
					{MENU_LINKS.map(({ label, href, icon: Icon }) => (
						<Link
							href={href}
							key={label + href}
							className={cn(
								'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
								{
									'text-muted-foreground': pathname !== href,
									'text-foreground': pathname === href,
									'bg-muted': pathname === href,
								}
							)}
						>
							<Icon className="h-5 w-5" />
							{label}
						</Link>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
};
