'use client';
import { Menu, Package2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib';
import { usePathname } from 'next/navigation';
import { MENU_LINKS } from '../links';

export const MobileMenu = () => {
	const pathname = usePathname();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="shrink-0 md:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="flex flex-col">
				<nav className="grid gap-2 text-lg font-medium">
					<Link
						href="#"
						className="flex items-center gap-2 text-lg font-semibold"
					>
						<Package2 className="h-6 w-6" />
						<span className="sr-only">Acme Inc</span>
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
				<div className="mt-auto">
					<Card>
						<CardHeader>
							<CardTitle>Upgrade to Pro</CardTitle>
							<CardDescription>
								Unlock all features and get unlimited access to our support
								team.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button size="sm" className="w-full">
								Upgrade
							</Button>
						</CardContent>
					</Card>
				</div>
			</SheetContent>
		</Sheet>
	);
};
