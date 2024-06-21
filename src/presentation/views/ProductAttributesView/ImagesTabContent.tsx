'use client';
import { ViewContent } from '@components/ui';
import { useProductContext } from '@presentation/views/ProductView/ProductContext';
import { forwardRef } from 'react';

export const AttributesTabContent = forwardRef<HTMLDivElement>((_, ref) => {
	const { product } = useProductContext();
	return (
		<ViewContent ref={ref} fullWidth className="flex-1 bg-muted relative">
			{product.title}
		</ViewContent>
	);
});

AttributesTabContent.displayName = 'AttributesTabContent';
