'use client';
import {
	Button,
	Input,
	TabsList,
	TabsTrigger,
	ViewActions,
	ViewActionsGroup,
	ViewHeader,
} from '@components/ui';
import { SearchIcon, WandSparklesIcon } from 'lucide-react';
import { CreateProductDialog } from './CreateProductDialog';

import { useProductsViewContext } from '../ProductsViewContext';
import { VIEW_MODE_CONFIG_MAP } from '../config';
import { ColumnVisibilityPopover } from './ColumnVisibilityPopover';
import { FiltersPopover } from './FiltersPopover';
import { CreateProductButton } from './CreateProductButton';

export const ProductsViewHeader = () => {
	return (
		<ViewHeader>
			<ViewActions>
				<div className='relative'>
					<Input className='pl-9' placeholder='Search products...' />
					<SearchIcon className='w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3 text-foreground/25' />
				</div>
				<ColumnVisibilityPopover />
				<FiltersPopover />
				<ViewActionsGroup className="ml-auto">
					<TabsList className="ml-auto">
						{Object.entries(VIEW_MODE_CONFIG_MAP).map(
							([mode, { icon: Icon }]) => (
								<TabsTrigger key={mode} value={mode}>
									<Icon size={16} />
								</TabsTrigger>
							)
						)}
					</TabsList>
					<CreateProductButton />
				</ViewActionsGroup>
			</ViewActions>
		</ViewHeader>
	);
};
