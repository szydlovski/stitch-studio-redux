import { Consumer, ModalHostProvider } from '@/src/presentation/features/modals/ModalProvider';
import { DashboardLayout } from '@presentation/layout';

export default function PalettesPage() {
	return (
		<DashboardLayout>
			<ModalHostProvider>
				<Consumer />
			</ModalHostProvider>
		</DashboardLayout>
	);
}
