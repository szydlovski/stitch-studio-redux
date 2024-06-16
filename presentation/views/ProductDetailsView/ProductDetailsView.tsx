import { Loader } from '@/presentation/components/Spinner';
import { ProductContextProvider } from '@/presentation/components/context/ProductContext';
import {
	ProductViewContent,
	ProductViewContentSkeleton,
} from './ProductDetailsContent';

export const ProductDetailsView = ({ productId }: { productId: string }) => {
	return (
		<ProductContextProvider
			productId={productId}
			loadingContent={<ProductViewContentSkeleton />}
		>
			<ProductViewContent />
		</ProductContextProvider>
	);
};
