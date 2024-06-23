import { FullProductObject } from '@domain/product';
import { useQuery } from '@tanstack/react-query';

export const getProductQueryKey = (productId: string) => ['product', productId];

export const getProduct = (productId: string) => {
	return fetch(`/api/products/${productId}`)
		.then((res) => res.json())
		.then(FullProductObject.fromAttributes)
		.then(product => {
			console.log(product.attributes.hoopConfig);
			
			return product;
		});
};

export const useGetProduct = (productId: string) => {
	return useQuery({
		queryKey: getProductQueryKey(productId),
		queryFn: () => getProduct(productId),
	});
};
