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
			<ProductContextProvider
				productId={productId}
				loadingContent={
					<div className="w-full h-full flex justify-center items-center">
						Loading product...
					</div>
				}
			>
				<SingleProductContent />
			</ProductContextProvider>
		</DashboardLayout>
	);
}
