'use client';

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	View,
	ViewContent,
	ViewHeader,
	ViewTitle,
} from '@components/ui';
import { cn } from '@lib/utils';

interface ChangelogEntry {
	version: string;
	date: string;
	description?: string;
	changes: string[];
}

const CHANGELOG: ChangelogEntry[] = [
	{
		version: '0.4.0',
		date: '23.06.2024',
		changes: [
			'Added Launch Checklist',
			'Added Cross Stitch Editor',
			'Added brand attributes editor',
			'Various fixes and improvements',
		],
	},
	{
		version: '0.3.0',
		date: '16.06.2024',
		changes: [
			'Added product cover generation',
			'Added cross stitch pdf preview',
			'Added brand view',
			'Etsy integration',
			'Revamped product details view',
			'Revamped sidebar',
			'Various fixes and small additions',
			'Major codebase cleanup',
		],
	},
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

export const DashboardView = () => {
	return (
		<View>
			<ViewHeader>
				<ViewTitle>{'Dashboard'}</ViewTitle>
				<div>
					<Dialog>
						<DialogTrigger asChild>
							<Button>Hello</Button>
						</DialogTrigger>
						<DialogContent
							className={cn(
								'max-w-screen',
								'sm:max-w-[calc(100vw-theme(spacing.8))]',
								'sm:max-h-[calc(100vh-theme(spacing.8))]',
								'h-full'
							)}
						>
							<div className="">
								Hello
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</ViewHeader>
			<ViewContent fullWidth className="bg-muted/40">
				<div className="flex flex-col gap-6 p-6 0 min-h-full">
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
			</ViewContent>
		</View>
	);
};
