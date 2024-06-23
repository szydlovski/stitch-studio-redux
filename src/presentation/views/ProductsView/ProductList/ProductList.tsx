'use client';
import { useListProducts } from '@application/product';
import { ErrorAlert } from '@components/ErrorAlert';
import { ProductTile, ProductTileSkeleton } from './ProductTile';
import { QueryStatusGuard } from '@/src/presentation/components/guard';
import { ReactNode } from 'react';
import { STITCH_FAIRY_CO_RECORD_ID } from '@brand/StitchFairyCo';

export const ProductTileGrid = ({ children }: { children: ReactNode }) => {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
			{children}
		</div>
	);
};

export const ProductList = ({ brand }: { brand: string[] }) => {
	const { data, status } = useListProducts({ brand });

	// return <DataGuard></DataGuard>
	return (
		<QueryStatusGuard
			props={data}
			status={status}
			loadingContent={
				<ProductTileGrid>
					{Array(24)
						.fill(0)
						.map((_, i) => {
							return <ProductTileSkeleton key={i} />;
						})}
				</ProductTileGrid>
			}
			errorContent={
				<ErrorAlert
					title={'Error'}
					description={
						'An error occurred while fetching products. Please try again later.'
					}
				/>
			}
		>
			{(products) => (
				<ProductTileGrid>
					{products.map((product) => (
						<ProductTile key={product.id} product={product} />
					))}
				</ProductTileGrid>
			)}
		</QueryStatusGuard>
	);
};
