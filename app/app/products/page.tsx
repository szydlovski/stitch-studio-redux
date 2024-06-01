import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { ListProductsContent } from './ListProductsContent';

export default function ProductsPage() {
	return (
		<DashboardLayout>
			<ListProductsContent />
		</DashboardLayout>
	);
}
