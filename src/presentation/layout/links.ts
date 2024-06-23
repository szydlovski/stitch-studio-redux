import { AppViews } from '@/app/routes';
import {
	GaugeIcon,
	LucideProps,
	Package,
	ShoppingBagIcon,
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
		href: AppViews.Dashboard(),
		icon: GaugeIcon,
		label: 'Dashboard',
	},
	{
		href: AppViews.Products(),
		icon: Package,
		label: 'Products',
	},
	{
		href: AppViews.Brands(),
		icon: StoreIcon,
		label: 'Brands',
	},
];
