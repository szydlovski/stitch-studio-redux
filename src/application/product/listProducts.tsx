import { BaseProductAttributes, BaseProductObject } from '@domain/product';
import {
	ListProductsParameters,
	ListProductsResult,
} from '@infrastructure/product/ListProductsQuery';
import { useQuery } from '@tanstack/react-query';

export const TEST_BRAND_RECORD_ID = 'rec_cppes4rjpt8uffogljgg';
export const STITCH_COVEN_RECORD_ID = 'rec_cpcbsnruh8o8tirs7gqg';

export const listProductQueryKey = () => ['listProducts'];

const encodeQueryParams = (params: Record<string, any | any[]>) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined) return;
		if (Array.isArray(value)) {
			value.forEach((v) => searchParams.append(key, v));
		} else {
			searchParams.append(key, value);
		}
	});
	return searchParams.toString();
};

interface ListProductsResults {
	products: BaseProductObject[];
	total: number;
}

export const listProducts = async (
	params: ListProductsParameters = {}
): Promise<ListProductsResults> => {
	console.log(params);

	return fetch(`/api/products?${encodeQueryParams(params)}`)
		.then((res): Promise<ListProductsResult> => res.json())
		.then(({ total, products }) => {
			return {
				total,
				products: products.map(BaseProductObject.fromAttributes),
			};
		});
};

export const useListProducts = (params?: ListProductsParameters) => {
	return useQuery({
		queryKey: [...listProductQueryKey(), params],
		queryFn: () => listProducts(params),
	});
};
