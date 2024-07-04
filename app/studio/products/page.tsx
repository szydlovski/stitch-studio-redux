import { DashboardLayout } from '@presentation/layout';
import { ProductsView } from '@presentation/views';

export default function ProductsPage() {
	return (
		<DashboardLayout>
			<ProductsView />
		</DashboardLayout>
	);
}
