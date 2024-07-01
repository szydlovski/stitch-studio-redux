// import Image from 'next/image';

import { DashboardLayout } from '@presentation/layout';
import { DashboardView } from '@presentation/views/DashboardView';

export default function Home() {
	return (
		<DashboardLayout>
			<DashboardView />
		</DashboardLayout>
	);
}
