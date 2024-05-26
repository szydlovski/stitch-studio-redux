'use client';
import Link from 'next/link';
import {
	Bell,
	CircleUser,
	GaugeIcon,
	LineChart,
	LucideProps,
	Menu,
	Package,
	Package2,
	Search,
	ShoppingCart,
	SwatchBookIcon,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ContainerProps } from '@/lib/types';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { cn } from '@/lib';
import { MENU_LINKS } from './links';
import { Sidebar } from './Sidebar';

const UserMenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" size="icon" className="rounded-full">
					<CircleUser className="h-5 w-5" />
					<span className="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const MobileMenu = () => {
	// const pathname = usePathname();
	const pathname = '/dashboard';
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

const SearchProducts = () => {
	return (
		<div className="w-full flex-1">
			<form>
				<div className="relative">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search products..."
						className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
					/>
				</div>
			</form>
		</div>
	);
};

const InnerLayout = ({ children }: ContainerProps) => {
	return (
		<div className="flex flex-col">
			<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
				<SearchProducts />
				<UserMenu />
				<MobileMenu />
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
				{children}
			</main>
		</div>
	);
};

export const DashboardLayout = ({ children }: ContainerProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const session = useSession();
	useEffect(() => {
		console.log();

		if (session.status === 'unauthenticated') {
			router.push('/login');
		}
	}, [pathname, router, session]);

	return session.status === 'unauthenticated' ? (
		<>Loading</>
	) : (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<Sidebar />
			<InnerLayout>{children}</InnerLayout>
		</div>
	);
};
