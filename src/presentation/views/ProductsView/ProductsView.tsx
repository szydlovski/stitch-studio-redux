import { ProductsViewContent } from './ProductsViewContent';
import { ProductsViewProvider } from './ProductsViewContext';

export const ProductsView = () => {
	return (
		<ProductsViewProvider>
			<ProductsViewContent />
		</ProductsViewProvider>
	);
};
