import { BrandItem } from '@/domain/brand/BrandItem';
import { ListBrandsQuery } from '@/infrastructure/brand/ListBrandsQuery';
import { BrandsContent } from './BrandsContent';

export const BrandsView = async () => {
	const brands = await new ListBrandsQuery()
		.execute()
		.then((records) => records.map(BrandItem.fromAttributes));
	return <BrandsContent brands={brands} />;
};
