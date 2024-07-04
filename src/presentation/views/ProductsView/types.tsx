import { BaseProductObject } from '@domain/product';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export enum ProductsViewMode {
	Grid = 'grid',
	List = 'list',
}

export interface ViewModeConfig {
	icon: LucideIcon;
	Content: (props: { products: BaseProductObject[] }) => ReactNode;
	Loading: () => ReactNode;
}
