'use client';
import { View } from '@components/ui';
import { BrandViewContent } from './BrandViewContent';
import { BrandViewContextProvider } from './BrandViewContext';
import { BrandViewHeader } from './BrandViewHeader';

interface BrandDetailsViewProps {
	brandId: string;
}

export const BrandView = ({ brandId }: BrandDetailsViewProps) => {
	return (
		<BrandViewContextProvider
			brandId={brandId}
			loadingContent={<div>Loading...</div>}
			errorContent={<div>Failed to load product</div>}
		>
			<View>
				<BrandViewHeader />
				<BrandViewContent />
			</View>
		</BrandViewContextProvider>
	);
};
