import { BrandItem } from '@domain/brand/BrandItem';
import { ListBrandsQuery } from '@infrastructure/brand/ListBrandsQuery';
import { DashboardLayout } from '@presentation/layout';
import { BrandsView } from '@presentation/views';

export default async function BrandsPage() {
	const brands = await new ListBrandsQuery()
		.execute()
		.then((records) => records.map(BrandItem.fromAttributes));
	return (
		<DashboardLayout>
			<BrandsView brands={brands} />
		</DashboardLayout>
	);
}
