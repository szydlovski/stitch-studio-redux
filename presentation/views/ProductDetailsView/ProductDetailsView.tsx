import { Loader } from '@/presentation/components/Spinner';
import { ProductContextProvider } from '@/presentation/components/context/ProductContext';
import { ProductViewContent } from './ProductDetailsContent';

export const ProductDetailsView = ({ productId }: { productId: string }) => {
	return (
		<ProductContextProvider
			productId={productId}
			loadingContent={
				<div className="w-full h-full flex justify-center items-center">
					<Loader />
				</div>
			}
		>
			<ProductViewContent />
		</ProductContextProvider>
	);
};
