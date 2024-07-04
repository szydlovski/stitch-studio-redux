'use client';
import { Grid2X2Icon } from 'lucide-react';
import { ProductTileGrid } from '../../components/ProductList';

import { ProductTile, ProductTileSkeleton } from '../../components/ProductTile';
import { ViewModeConfig } from '../../types';
import { useProductsViewContext } from '../../ProductsViewContext';
import { ViewContent } from '@components/ui';
import { ProductsViewFooter } from '../../components/ProductsViewFooter';

export const gridConfig: ViewModeConfig = {
	icon: Grid2X2Icon,
	Content: ({ products }) => {
		const { table } = useProductsViewContext();
		return (
			<ViewContent scrollX>
				<ProductTileGrid>
					{products.map((product) => (
						<ProductTile key={product.id} product={product} />
					))}
				</ProductTileGrid>
				<ProductsViewFooter />
			</ViewContent>
		);
	},
	Loading: () => {
		return (
			<ViewContent scrollX>
				<ProductTileGrid>
					{Array(24)
						.fill(0)
						.map((_, i) => {
							return <ProductTileSkeleton key={i} />;
						})}
				</ProductTileGrid>
			</ViewContent>
		);
	},
};
