'use client';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { ContainerProps } from '@/lib/types';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
import { Sidebar } from './Sidebar';
import { UserMenu } from './UserMenu';

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import React from 'react';
import { MENU_LINKS } from '../links';

export function CommandMenu() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<>
			<div className="w-full flex-1">
				<form>
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search..."
							className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
							onFocus={() => setOpen(true)}
						/>
					</div>
				</form>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						{MENU_LINKS.map(({ href, label, icon: Icon }) => (
							<CommandItem value={label} onSelect={() => router.push(href)}>
								<Icon />
								{label}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}

export const DashboardLayout = ({ children }: ContainerProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const session = useSession();
	React.useEffect(() => {
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
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					{/* <GlobalSearch /> */}
					<CommandMenu />
					<UserMenu />
					<MobileMenu />
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					{children}
				</main>
			</div>
		</div>
	);
};
