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
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@components/ui';
import { CircleUser, Moon, Sun } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export const UserDropdownMenuContent = () => {
	const { data } = useSession();
	const { theme, setTheme, systemTheme } = useTheme();

	return (
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>{`Theme: ${
					theme === 'light' ? 'Light' : 'Dark'
				}`}</DropdownMenuSubTrigger>
				<DropdownMenuSubContent>
					<DropdownMenuItem onClick={() => setTheme('light')}>
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('dark')}>
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('system')}>
						System
					</DropdownMenuItem>
				</DropdownMenuSubContent>
			</DropdownMenuSub>
			<DropdownMenuItem asChild>
				<Link href="/studio/user">Settings</Link>
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
	const { theme, setTheme } = useTheme();
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
