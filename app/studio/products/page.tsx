import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { ListProductsContent } from './content';

export default function ProductsPage() {
	return (
		<DashboardLayout>
			<ListProductsContent />
		</DashboardLayout>
	);
}
