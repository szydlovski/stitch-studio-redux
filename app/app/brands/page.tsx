import { DashboardViewLayout } from '@/components/DashboardViewLayout';
import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { BrandsContent } from './BrandsContent';
import { listBrands } from '../../../actions/listBrands';

export default async function BrandsPage() {
	const brands = await listBrands();
	return (
		<DashboardLayout>
			<BrandsContent brands={brands} />
		</DashboardLayout>
	);
}
