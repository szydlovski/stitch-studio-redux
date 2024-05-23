// import Image from 'next/image';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui';
import { StatsCard } from '../../components/StatsCard';

const DashboardContent = () => {
	return (
		<>
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
			</div>
			<div className="grid grid-cols-4 gap-x-4">
				<StatsCard
					description="This Week"
					figure="$1,329"
					footer="+25% over last month"
				/>
				<StatsCard
					description="This Week"
					figure="$1,329"
					footer="+25% over last month"
				/>
				<StatsCard
					description="This Week"
					figure="$1,329"
					footer="+25% over last month"
				/>
				<StatsCard
					description="This Week"
					figure="$1,329"
					footer="+25% over last month"
				/>
			</div>
			<div
				className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
				x-chunk="dashboard-02-chunk-1"
			>
				<div className="flex flex-col items-center gap-1 text-center">
					<h3 className="text-2xl font-bold tracking-tight">
						You have no products
					</h3>
					<p className="text-sm text-muted-foreground">
						You can start selling as soon as you add a product.
					</p>
					<Button className="mt-4">Add Product</Button>
				</div>
			</div>
		</>
	);
};

export default function Home() {
	return (
		<DashboardLayout>
			<DashboardContent />
		</DashboardLayout>
	);
}
