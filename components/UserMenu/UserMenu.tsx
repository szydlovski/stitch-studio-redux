'use client';
import { CircleUser } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const UserDropdownMenuContent = () => {
	const { data } = useSession();
	
	return (
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem>Test</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<Link href="/app/user">Settings</Link>
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
