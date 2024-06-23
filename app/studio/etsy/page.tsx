import { STITCH_FAIRY_CO_RECORD_ID } from '@brand/StitchFairyCo';
import { Button } from '@components/ui';
import { DashboardLayout } from '@presentation/layout';

export default async function EtsyListingsDirectoryPage() {
	return (
		<DashboardLayout>
			<div className="p-6">
				<div>Etsy</div>
				<div>
					<Button asChild variant="etsy">
						<a href={`/api/commerce/etsy/auth/init?brandId=${STITCH_FAIRY_CO_RECORD_ID}`} target="_blank">
							Connect Etsy shop
						</a>
					</Button>
				</div>
			</div>
		</DashboardLayout>
	);
}
