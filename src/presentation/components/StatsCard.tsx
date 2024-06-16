// import Image from 'next/image';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Progress,
} from '@components/ui';

export interface StatsCardProps {
	description: string;
	figure: string;
	footer: string;
}

export const StatsCard = ({ description, figure, footer }: StatsCardProps) => {
	return (
		<Card x-chunk="dashboard-05-chunk-1">
			<CardHeader className="pb-2">
				<CardDescription>{description}</CardDescription>
				<CardTitle className="text-4xl">{figure}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-xs text-muted-foreground">{footer}</div>
			</CardContent>
			<CardFooter>
				<Progress value={25} aria-label="25% increase" />
			</CardFooter>
		</Card>
	);
};
