import { StitchFairyCoModule } from '@brand/StitchFairyCo';
import { ListEtsyListingByBrandQuery } from '@infrastructure/etsy/query/ListEtsyListingByBrandQuery';
import { DashboardLayout } from '@presentation/layout';
import { EtsyListingsDirectoryView } from '@presentation/views/EtsyListingsDirectoryView';

export default async function EtsyListingsDirectoryPage() {
	const listings = await new ListEtsyListingByBrandQuery().execute(
		StitchFairyCoModule.brandId,
		40,
		0
	);
	return (
		<DashboardLayout>
			<EtsyListingsDirectoryView listings={listings} />
		</DashboardLayout>
	);
}
