'use client';
import { ErrorAlert } from '@/components/ErrorAlert';
import { ProductTile, ProductTileSkeleton } from './ProductTile';
import { ProductItem } from '@/context/product/domain/ProductItem';
import { ProductApiClient } from '@/context/product/infrastructure/ProductApiClient';
import { useQuery } from '@tanstack/react-query';

export const ProductList = () => {
	const { data, status } = useQuery<ProductItem[]>({
		queryKey: ['listProducts'],
		queryFn: () => new ProductApiClient().list(),
	});
	console.log('products', data, status);
	
	return status === 'error' ? (
		<div className="py-6">
			<ErrorAlert
				title={'Error'}
				description={
					'An error occurred while fetching products. Please try again later.'
				}
			/>
		</div>
	) : (
		<div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
			{status === 'pending'
				? Array(12)
						.fill(0)
						.map((_, i) => {
							return <ProductTileSkeleton key={i} />;
						})
				: data.map((product) => (
						<ProductTile key={product.id} product={product} />
				  ))}
		</div>
	);
};
