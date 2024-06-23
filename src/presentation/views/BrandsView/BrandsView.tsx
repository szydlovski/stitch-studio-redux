import { BrandItem } from '@domain/brand/BrandItem';
import { BrandsContent } from './BrandsContent';
import { View, ViewContent, ViewHeader, ViewTitle } from '@components/ui';

export const BrandsView = ({ brands }: { brands: BrandItem[] }) => {
	return (
		<View>
			<ViewHeader>
				<ViewTitle>Brands</ViewTitle>
			</ViewHeader>
			<ViewContent fullWidth className=''>
				<BrandsContent brands={brands} />
			</ViewContent>
		</View>
	);
};
