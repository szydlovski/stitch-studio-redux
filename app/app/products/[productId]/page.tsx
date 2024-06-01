import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { SingleProductContent } from './SingleProductContent';
import { ProductContextProvider } from './components/ProductContext';

export default function ProductPage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	return (
		<DashboardLayout>
			<ProductContextProvider productId={productId}>
				<SingleProductContent />
			</ProductContextProvider>
		</DashboardLayout>
	);
}
