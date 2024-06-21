'use client';
import Link from 'next/link';

import { cn } from '@/lib';
import { Badge, Tooltip, TooltipContent, TooltipTrigger } from '@components/ui';
import { Building2Icon } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MENU_LINKS } from '../../links';

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
		<div className="relative hidden border-r bg-muted/40 sm:block h-full">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 justify-center items-center border-b">
					<Link href="/">
						<Image
							className="w-6 h-6 hover:scale-125 transition-all"
							src="/icon-sm.png"
							alt="StitchStudio"
							width={48}
							height={48}
						/>
					</Link>
				</div>
				<div className="flex-1">
					<nav className="grid items-start text-sm font-medium p-2 gap-2">
						{MENU_LINKS.map(({ label, href, icon: Icon }) => {
							const isActive = pathname.startsWith(href);
							return (
								<Tooltip key={href} delayDuration={300}>
									<TooltipTrigger asChild>
										<Link
											href={href}
											className={cn(
												'flex justify-center items-center gap-3 rounded-lg transition-all text-muted-foreground w-10 h-10',
												{
													'bg-muted text-primary': isActive,
												}
											)}
										>
											<Icon className="h-5 w-5" />
										</Link>
									</TooltipTrigger>
									<TooltipContent side="right">{label}</TooltipContent>
								</Tooltip>
							);
						})}
					</nav>
				</div>
			</div>
			{/* <button className="absolute group rounded-full bg-background h-6 w-6 top-[50%] right-0 border flex justify-center items-center translate-y-[-50%] translate-x-[50%] z-50">
				<TriangleIcon
					className="rotate-[-30deg] relative left-[-1px] text-muted-foreground/50 group-hover:text-muted-foreground"
					fill="currentColor"
					strokeWidth={1}
					size={8}
				/>
			</button> */}
		</div>
	);
};

export const SidebarFull = () => {
	const pathname = usePathname();
	return (
		<div className="hidden border-r bg-muted/40 sm:block h-full">
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
