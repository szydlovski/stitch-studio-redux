import { DashboardLayout } from '@/presentation/layout';
import { ProductDetailsView } from '@/presentation/views';

export default function ProductPage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	return (
		<DashboardLayout>
			<ProductDetailsView productId={productId} />
		</DashboardLayout>
	);
}
