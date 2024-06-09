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
		href: '/studio/dashboard',
		icon: GaugeIcon,
		label: 'Dashboard',
	},
	{
		href: '/studio/products',
		icon: Package,
		label: 'Products',
	},
	{
		href: '/studio/brands',
		icon: StoreIcon,
		label: 'Brands',
	},
	{
		href: '/studio/palettes',
		icon: SwatchBookIcon,
		label: 'Palettes',
	},
];
