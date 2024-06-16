import { ProductDetails } from '@domain/product/ProductDetails';
import { useQuery } from '@tanstack/react-query';

export const getProductQueryKey = (productId: string) => ['product', productId];

export const getProduct = (productId: string) => {
	return fetch(`/api/products/${productId}`)
		.then((res) => res.json())
		.then(ProductDetails.fromAttributes);
};

export const useGetProduct = (productId: string) => {
	return useQuery({
		queryKey: getProductQueryKey(productId),
		queryFn: () => getProduct(productId),
	});
};