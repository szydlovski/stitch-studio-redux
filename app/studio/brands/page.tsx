import { DashboardLayout } from '@/presentation/layout';
import { BrandsContent } from './BrandsContent';
import { listBrands } from './listBrands';

export default async function BrandsPage() {
	const brands = await listBrands();
	return (
		<DashboardLayout>
			<BrandsContent brands={brands} />
		</DashboardLayout>
	);
}
