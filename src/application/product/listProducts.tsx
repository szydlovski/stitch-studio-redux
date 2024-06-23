import { STITCH_FAIRY_CO_RECORD_ID } from '@brand/StitchFairyCo';
import {
	BaseProductObject,
	BaseProductAttributes,
} from '@domain/product';
import { ListProductsParameters } from '@infrastructure/product/ListProductsQuery';
import { useQuery } from '@tanstack/react-query';

interface ListProductsResponse {
	products: BaseProductAttributes[];
}

export const TEST_BRAND_RECORD_ID = 'rec_cppes4rjpt8uffogljgg';
export const STITCH_COVEN_RECORD_ID = 'rec_cpcbsnruh8o8tirs7gqg';

export const listProductQueryKey = () => ['listProducts'];

const encodeQueryParams = (params: Record<string, any | any[]>) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			value.forEach((v) => searchParams.append(key, v));
		} else {
			searchParams.append(key, value);
		}
	});
	return searchParams.toString();
};

export const listProducts = async (
	params: ListProductsParameters = {}
): Promise<BaseProductObject[]> => {
	return fetch(`/api/products?${encodeQueryParams(params)}`)
		.then((res): Promise<ListProductsResponse> => res.json())
		.then(({ products }) => products.map(BaseProductObject.fromAttributes));
};

export const useListProducts = (params?: ListProductsParameters) => {
	return useQuery({
		queryKey: [...listProductQueryKey(), params],
		queryFn: () => listProducts(params),
	});
};
