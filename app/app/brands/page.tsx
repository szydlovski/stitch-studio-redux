import { DashboardViewLayout } from '@/components/DashboardViewLayout';
import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { BrandsView } from './view';
import { listBrands } from '../../../actions/listBrands';

export default async function BrandsPage() {
	const brands = await listBrands();
	return (
		<DashboardLayout>
			{/* <DashboardViewLayout title="Brands">{'NYI'}</DashboardViewLayout> */}
			<BrandsView brands={brands} />
		</DashboardLayout>
	);
}
