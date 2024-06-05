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

interface ChangelogEntry {
	version: string;
	date: string;
	description?: string;
	changes: string[];
}

const CHANGELOG: ChangelogEntry[] = [
	{
		version: '0.2.0',
		date: '03.06.2024',
		changes: [
			'Added this changelog',
			'Added User Settings view',
			'Product titles can now be edited',
			'Products can now be deleted',
			'Product author is saved correctly',
			'Product cover generation preview',
			'Enabled strict authentication, requiring user accounts',
			'Various layout & UX improvements',
		],
	},
	{
		version: '0.1.0',
		date: '31.05.2024',
		description:
			'The first version of the new StitchStudio app. Supports a narrow set of use cases:',
		changes: [
			'Create product',
			'List products',
			'View product details',
			'List brands',
		],
	},
];

export default function Home() {
	return (
		<DashboardLayout>
			<div className="flex flex-col gap-6 p-6 bg-muted/40 min-h-full">
				<h1 className="text-lg font-semibold md:text-2xl">
					{'Development Updates'}
				</h1>
				<div className="grid gap-4">
					{CHANGELOG.map((entry) => (
						<Card key={entry.version}>
							<CardHeader>
								<CardTitle>{entry.version}</CardTitle>
								<CardDescription>{entry.date}</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								{entry.description && <p>{entry.description}</p>}
								<ul className="list-disc pl-8">
									{entry.changes.map((change, i) => (
										<li key={i}>{change}</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</DashboardLayout>
	);
}
