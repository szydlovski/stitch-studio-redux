import { Suspense } from 'react';
import { ProductViewContextProvider } from './ProductViewContext';
import {
	ProductViewContent,
	ProductViewContentSkeleton,
} from './ProductViewContent';

export const ProductDetailsView = ({ productId }: { productId: string }) => {
	return (
		<Suspense>
			<ProductViewContextProvider
				productId={productId}
				loadingContent={<ProductViewContentSkeleton />}
				errorContent={<div>Failed to load product</div>}
			>
				<ProductViewContent />
			</ProductViewContextProvider>
		</Suspense>
	);
};
