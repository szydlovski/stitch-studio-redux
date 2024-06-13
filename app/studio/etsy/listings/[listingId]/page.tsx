import { GetEtsyListingQuery } from '@/infrastructure/etsy/query/GetEtsyListing';
import { DashboardLayout } from '@/presentation/layout';
import { EtsyListingView } from '@/presentation/views/EtsyListingView';

export default async function EtsyListingPage({
	params: { listingId },
}: {
	params: { listingId: string };
}) {
	const listing = await new GetEtsyListingQuery().execute(listingId);
	return (
		<DashboardLayout>
			<EtsyListingView listing={listing} />
		</DashboardLayout>
	);
}
