import { GetBrandQuery } from '@infrastructure/brand/GetBrandQuery';
import { DashboardLayout } from '@presentation/layout';
import { BrandView } from '@presentation/views/BrandView';

export default async function BrandDetailsPage({
	params: { brandId },
}: {
	params: { brandId: string };
}) {
	const brand = await new GetBrandQuery().execute(brandId);
	return (
		<DashboardLayout>
			<BrandView brandId={brandId} brand={brand} />
		</DashboardLayout>
	);
}
