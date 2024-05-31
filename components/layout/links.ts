import {
	GaugeIcon,
	LucideProps,
	Package,
	StoreIcon,
	SwatchBookIcon,
} from 'lucide-react';

interface MenuLink {
	href: string;
	icon: React.FC<LucideProps>;
	label: string;
}

export const MENU_LINKS: MenuLink[] = [
	{
		href: '/app/dashboard',
		icon: GaugeIcon,
		label: 'Dashboard',
	},
	{
		href: '/app/products',
		icon: Package,
		label: 'Products',
	},
	{
		href: '/app/palettes',
		icon: SwatchBookIcon,
		label: 'Palettes',
	},
	{
		href: '/app/brands',
		icon: StoreIcon,
		label: 'Brands',
	},
];
