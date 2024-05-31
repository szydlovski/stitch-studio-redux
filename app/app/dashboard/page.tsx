// import Image from 'next/image';

import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { Button } from '@/components/ui';
import { StatsCard } from '@/components/StatsCard';
import { DashboardViewLayout } from '@/components/DashboardViewLayout';

export default function Home() {
	return (
		<DashboardLayout>
			<DashboardViewLayout title={'Dashboard'}>{'NYI'}</DashboardViewLayout>
		</DashboardLayout>
	);
}
