import { BrandItem } from '@domain/brand/BrandItem';
import { BrandsContent } from './BrandsContent';

export const BrandsView = ({ brands }: { brands: BrandItem[] }) => {
	return <BrandsContent brands={brands} />;
};
