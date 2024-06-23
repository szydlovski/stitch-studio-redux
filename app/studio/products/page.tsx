import { DashboardLayout } from '@presentation/layout';
import { ProductListView } from '@presentation/views';

export default function ProductsPage() {
	return (
		<DashboardLayout>
			<ProductListView />
		</DashboardLayout>
	);
}
