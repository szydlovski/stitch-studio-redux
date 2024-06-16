import { Suspense } from 'react';
import { ProductContextProvider } from './ProductContext';
import {
	ProductViewContent,
	ProductViewContentSkeleton,
} from './ProductViewContent';

export const ProductDetailsView = ({ productId }: { productId: string }) => {
	return (
		<Suspense>
			<ProductContextProvider
				productId={productId}
				loadingContent={<ProductViewContentSkeleton />}
			>
				<ProductViewContent />
			</ProductContextProvider>
		</Suspense>
	);
};
