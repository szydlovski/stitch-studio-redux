import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { ProductView } from './view';

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
