import { Consumer, ModalHostProvider } from '@components/ModalProvider';
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
