import { BrandDetails } from '@domain/brand';
import { useQuery } from '@tanstack/react-query';

export const getBrandQueryKey = (brandId: string) => ['product', brandId];

export const getBrand = (brandId: string) => {
	return fetch(`/api/brands/${brandId}`)
		.then((res) => res.json())
		.then(BrandDetails.fromAttributes);
};

export const useGetBrand = (brandId: string) => {
	return useQuery({
		queryKey: getBrandQueryKey(brandId),
		queryFn: () => getBrand(brandId),
	});
};
