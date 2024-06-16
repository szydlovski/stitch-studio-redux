import { DashboardViewLayout } from '@/presentation/components/DashboardViewLayout';
import {
	Consumer,
	ModalHostProvider,
} from '@/presentation/components/ModalProvider';
import { DashboardLayout } from '@/presentation/layout';

export default function PalettesPage() {
	return (
		<DashboardLayout>
			<DashboardViewLayout title="Palettes">
				<ModalHostProvider>
					<Consumer />
				</ModalHostProvider>
			</DashboardViewLayout>
		</DashboardLayout>
	);
}
