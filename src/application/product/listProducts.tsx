import {
	ProductItem,
	ProductItemAttributes,
} from '@domain/product/ProductItem';
import { useQuery } from '@tanstack/react-query';

interface ListProductsResponse {
	products: ProductItemAttributes[];
}

export const listProductQueryKey = () => ['listProducts'];

export const listProducts = async (): Promise<ProductItem[]> => {
	return fetch('/api/products')
		.then((res): Promise<ListProductsResponse> => res.json())
		.then(({ products }) => products.map(ProductItem.fromAttributes));
};

export const useListProducts = () => {
	return useQuery({
		queryKey: listProductQueryKey(),
		queryFn: listProducts,
	});
};
