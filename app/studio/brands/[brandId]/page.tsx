import { DashboardLayout } from '@presentation/layout';
import { BrandView } from '@presentation/views/BrandView';

export default function BrandDetailsPage({
	params: { brandId },
}: {
	params: { brandId: string };
}) {
	return (
		<DashboardLayout>
			<BrandView brandId={brandId} />
		</DashboardLayout>
	);
}
