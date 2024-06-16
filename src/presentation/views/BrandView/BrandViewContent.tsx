'use client';
import { ViewContent } from '@components/ui';
import { EtsyCard } from './components/EtsyCard';

export const BrandViewContent = () => {
	return (
		<ViewContent className="p-6 bg-muted">
			<EtsyCard />
		</ViewContent>
	);
};
