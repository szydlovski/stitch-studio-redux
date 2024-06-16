import {
	ProductImageItem,
	ProductImageItemAttributes,
} from '@domain/product-image/ProductImageItem';
import { useQuery } from '@tanstack/react-query';

interface GetProductImagesResponse {
	images: ProductImageItemAttributes[];
}

export const getProductImagesQueryKey = (productId: string) => [
	'productImages',
	productId,
];

const getProductImages = (productId: string) => {
	return fetch(`/api/products/${productId}/images`)
		.then((res): Promise<GetProductImagesResponse> => res.json())
		.then(({ images }) => images.map(ProductImageItem.fromAttributes));
};

export const useGetProductImages = (productId: string) => {
	return useQuery({
		queryKey: getProductImagesQueryKey(productId),
		queryFn: () => getProductImages(productId),
	});
};
