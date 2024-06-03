// import Image from 'next/image';

import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { StatsCard } from '@/components/StatsCard';
import { DashboardViewLayout } from '@/components/DashboardViewLayout';

export default function Home() {
	return (
		<DashboardLayout>
			<div className="flex flex-col gap-6 p-6 bg-muted/40 min-h-full">
				<h1 className="text-lg font-semibold md:text-2xl">
					{'Development Updates'}
				</h1>
				<div className="grid gap-4">
					<Card>
						<CardHeader>
							<CardTitle>Pierwszy prototyp</CardTitle>
							<CardDescription>02.06.2024</CardDescription>
						</CardHeader>
						<CardContent className='flex flex-col gap-2'>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
								nec purus feugiat, molestie ipsum et, varius velit hasellus non.
								Ut ultricies nisl nec felis scelerisque, nec lobortis erat
								ultricies. Integer sit amet semper turpis.
							</p>
							<ul className='list-disc pl-5'>
								<li>First</li>
								<li>Second</li>
								<li>Third</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	);
}
