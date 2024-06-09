import { DashboardLayout } from '@/presentation/layout';
import { ProductView } from '@/presentation/views';

export default function ProductPage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	return (
		<DashboardLayout>
			<ProductView productId={productId} />
		</DashboardLayout>
	);
}
