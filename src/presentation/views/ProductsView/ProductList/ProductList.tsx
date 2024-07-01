'use client';
import { QueryStatusGuard } from '@/src/presentation/components/guard';
import { useListProducts } from '@application/product';
import { ErrorAlert } from '@components/ErrorAlert';
import { ReactNode } from 'react';
import { ProductTile, ProductTileSkeleton } from './ProductTile';
import { BaseProductObject } from '@domain/product';

export const ProductTileGrid = ({ children }: { children: ReactNode }) => {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
			{children}
		</div>
	);
};

export const ProductListSkeleton = () => (
	<ProductTileGrid>
		{Array(24)
			.fill(0)
			.map((_, i) => {
				return <ProductTileSkeleton key={i} />;
			})}
	</ProductTileGrid>
);

export const ProductList = ({
	products,
}: {
	products: BaseProductObject[];
}) => {
	return (
		<ProductTileGrid>
			{products.map((product) => (
				<ProductTile key={product.id} product={product} />
			))}
			
		</ProductTileGrid>
	);
};
