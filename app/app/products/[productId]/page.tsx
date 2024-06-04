import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { SingleProductContent } from './content';
import { ProductContextProvider } from '@/components/context/ProductContext';

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
