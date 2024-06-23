import { Consumer, ModalHostProvider } from '@presentation/features/modals/ModalProvider';
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
