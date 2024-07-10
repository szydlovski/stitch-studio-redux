import {
	Cloud,
	CreditCard,
	Keyboard,
	LifeBuoy,
	LogOut,
	LucideIcon,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from 'lucide-react';

import { Button } from '@components/ui/button';
import {
	DropdownMenu as DropdownMenuRoot,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@lib/utils';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget } from 'react';

const TEST_ITEMS: DropdownMenuEntry[] = [
	{
		type: 'item',
		label: 'Profile',
		icon: User,
		shortcut: '⇧⌘P',
	},
	{
		type: 'item',
		label: 'Billing',
		icon: CreditCard,
		shortcut: '⌘B',
	},
	{
		type: 'item',
		label: 'Settings',
		icon: Settings,
		shortcut: '⌘S',
	},
	{
		type: 'item',
		label: 'Keyboard shortcuts',
		icon: Keyboard,
		shortcut: '⌘K',
	},
	{
		type: 'separator',
	},
	{
		type: 'item',
		label: 'Team',
		icon: Users,
	},
	{
		type: 'item',
		label: 'Invite users',
		icon: UserPlus,
		children: [
			{
				type: 'item',
				label: 'Email',
				icon: Mail,
			},
			{
				type: 'item',
				label: 'Message',
				icon: MessageSquare,
			},
			{
				type: 'item',
				label: 'More...',
				icon: PlusCircle,
			},
		],
	},
	{
		type: 'item',
		label: 'New Team',
		icon: Plus,
		shortcut: '⌘+T',
	},
	{
		type: 'separator',
	},
	{
		type: 'item',
		label: 'Support',
		icon: LifeBuoy,
	},
	{
		type: 'item',
		label: 'API',
		icon: Cloud,
		disabled: true,
	},
	{
		type: 'item',
		label: 'Log out',
		icon: LogOut,
		shortcut: '⇧⌘Q',
	},
];

interface MyMenuItemConfig {
	type: 'item';
	label: string;
	icon: LucideIcon;
	disabled?: boolean;
	children?: MyMenuItemConfig[];
	shortcut?: string;
	href?: string;
	target?: HTMLAttributeAnchorTarget;
	isDangerous?: boolean;
	onClick?: () => void;
}

interface MyMenuSeparatorConfig {
	type: 'separator';
}

interface MyMenuLabelConfig {
	type: 'label';
	label: string;
	variant?: 'title' | 'default';
}

const MyMenuItem = ({
	item: {
		children,
		label,
		shortcut,
		icon: Icon,
		disabled,
		href,
		isDangerous,
		onClick,
		target,
	},
}: {
	item: MyMenuItemConfig;
}) => {
	const content = (
		<>
			<Icon
				className={cn('mr-2 h-4 w-4 opacity-80', {
					'text-red-600': isDangerous,
				})}
			/>
			<span className={cn({ 'text-red-600': isDangerous })}>{label}</span>
		</>
	);
	return children ? (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger className="gap-2" disabled={disabled}>
				{content}
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent>
					{children.map((item, index) => (
						<MyMenuItem key={index} item={item} />
					))}
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	) : href ? (
		<DropdownMenuItem disabled={disabled} asChild>
			<Link href={href} target={target}>
				{content}
				{shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
			</Link>
		</DropdownMenuItem>
	) : (
		<DropdownMenuItem disabled={disabled}>
			{content}
			{shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
		</DropdownMenuItem>
	);
};

export type DropdownMenuEntry =
	| MyMenuSeparatorConfig
	| MyMenuItemConfig
	| MyMenuLabelConfig;

const myMenuContentVariants = cva('', {
	variants: {
		size: {
			xs: 'w-32',
			sm: 'w-40',
			md: 'w-56',
			lg: 'w-64',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

interface MyMenuProps extends VariantProps<typeof myMenuContentVariants> {
	items?: DropdownMenuEntry[];
	children?: JSX.Element;
}

export const DropdownMenu = ({
	items = TEST_ITEMS,
	children = <Button>Open menu</Button>,
	size = 'md',
}: MyMenuProps) => {
	return (
		<DropdownMenuRoot>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className={cn(myMenuContentVariants({ size }))}>
				{items.map((item, index) => {
					switch (item.type) {
						case 'separator':
							return <DropdownMenuSeparator key={index} />;
						case 'item':
							return <MyMenuItem key={index} item={item} />;
						case 'label':
							return (
								<DropdownMenuLabel
									className={item.variant === 'title' ? '' : "uppercase text-[0.6rem] opacity-50 flex items-center gap-2"}
									key={index}
								>
									{item.label}
									<DropdownMenuSeparator className="flex-1 mr-2" />
								</DropdownMenuLabel>
							);
					}
				})}
			</DropdownMenuContent>
		</DropdownMenuRoot>
	);
};
