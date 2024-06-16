'use client';
import { BrandDetails } from '@domain/brand/BrandDetails';
import { View } from '@components/ui';
import { BrandViewContent } from './BrandViewContent';
import { BrandViewContextProvider } from './BrandViewContext';
import { BrandViewHeader } from './BrandViewHeader';

interface BrandDetailsViewProps {
	brandId: string;
	brand: BrandDetails;
}

export const BrandView = ({ brand }: BrandDetailsViewProps) => {
	return (
		<BrandViewContextProvider brand={brand}>
			<View>
				<BrandViewHeader />
				<BrandViewContent />
			</View>
		</BrandViewContextProvider>
	);
};
