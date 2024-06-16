import { DashboardLayout } from '@/presentation/layout';
import { BrandsView } from '@/presentation/views/BrandsView';

export default async function BrandsPage() {
	return (
		<DashboardLayout>
			<BrandsView />
		</DashboardLayout>
	);
}
