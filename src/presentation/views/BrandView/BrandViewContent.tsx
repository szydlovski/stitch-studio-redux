'use client';
import { CardStack, ViewContent } from '@components/ui';
import { EtsyCard } from './components/EtsyCard';
import { AttributesCard } from './components/AttributesCard';

export const BrandViewContent = () => {
	return (
		<ViewContent className="bg-muted">
			<CardStack>
				<EtsyCard />
				<AttributesCard />
			</CardStack>
		</ViewContent>
	);
};
