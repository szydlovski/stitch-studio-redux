'use client';
import Link from 'next/link';

import { cn } from '@/lib';
import { usePathname } from 'next/navigation';
import { MENU_LINKS } from '../../links';
import Image from 'next/image';
import { Separator } from '@/presentation/components/ui/separator';
import { Building2Icon, PaletteIcon } from 'lucide-react';
import { Badge } from '@/presentation/components/ui';

export const BigMenu = () => {
	const pathname = usePathname();
	return (
		<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
			{MENU_LINKS.map(({ label, href, icon: Icon }) => (
				<Link
					href={href}
					key={label + href}
					className={cn(
						'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
						{
							'bg-muted text-primary': pathname.startsWith(href),
							'text-muted-foreground': !pathname.startsWith(href),
						}
					)}
				>
					<Icon className="h-4 w-4" />
					{label}
				</Link>
			))}
			{/* <Separator className='my-3 w-[80%] mx-auto' /> */}
			<span className="px-3 pt-3 uppercase text-[0.65rem] text-muted-foreground font-semibold">
				Crafts
			</span>
			<Link
				href={'#'}
				className={
					'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground'
				}
			>
				<Building2Icon className="h-4 w-4" />
				{'Cross Stitch'}
			</Link>
			<Link
				href={'#'}
				className={
					'flex items-center gap-3 rounded-lg px-3 py-2 ml-7 transition-all hover:text-primary text-muted-foreground'
				}
			>
				{'Palettes'}
			</Link>
			<Link
				href={'#'}
				className={
					'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground'
				}
			>
				<Building2Icon className="h-4 w-4" />
				<span>{'Seamless'}</span>
				<Badge
					variant={'outline'}
					className="text-foreground/20 text-[0.6rem] py-0.5 px-1.5 font-bold uppercase leading-none"
				>
					Coming soon
				</Badge>
			</Link>
			<span className="px-3 pt-3 uppercase text-[0.65rem] text-muted-foreground font-semibold">
				Commerce
			</span>
			<Link
				href={'#'}
				className={
					'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground'
				}
			>
				<Building2Icon className="h-4 w-4" />
				{'Etsy'}
			</Link>
			<Link
				href={'#'}
				className={
					'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground'
				}
			>
				<Building2Icon className="h-4 w-4" />
				{'Shopify'}
			</Link>
		</nav>
	);
};

export const Sidebar = () => {
	const pathname = usePathname();
	return (
		<div className="hidden border-r bg-muted/40 md:block h-full">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link href="/" className="flex items-center gap-2 font-semibold">
						<Image
							src="/icon-sm.png"
							width={24}
							height={24}
							alt="StitchStudio"
						/>
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
										'bg-muted text-primary': pathname.startsWith(href),
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
