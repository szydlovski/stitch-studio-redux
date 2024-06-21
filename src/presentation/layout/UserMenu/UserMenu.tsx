'use client';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@components/ui';
import { CircleUser, Moon, Sun } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export const UserDropdownMenuContent = () => {
	const { data } = useSession();
	const { setTheme } = useTheme();

	return (
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem>Test</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<Link href="/studio/user">Settings</Link>
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem onClick={() => setTheme('light')}>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuItem>
			<DropdownMenuItem onClick={() => setTheme('light')}>
				Light
			</DropdownMenuItem>
			<DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
			<DropdownMenuItem onClick={() => setTheme('system')}>
				System
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })}>
				Logout
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
};

export const UserMenu = () => {
	const { data } = useSession();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" size="icon" className="rounded-full">
					<Avatar>
						<AvatarImage
							className="h-full"
							src={data?.user?.image ?? undefined}
						/>
						<AvatarFallback>
							<CircleUser className="h-5 w-5" />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<UserDropdownMenuContent />
		</DropdownMenu>
	);
};
