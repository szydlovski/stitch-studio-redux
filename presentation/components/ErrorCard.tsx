import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/presentation/components/ui';
import { cn } from '@/lib';
import { CircleXIcon, LucideProps } from 'lucide-react';
import { FC, ReactNode } from 'react';

export const ErrorCard = ({
	title,
	message,
	className,
	children,
	icon: Icon = CircleXIcon,
}: {
	title: string;
	message: string;
	className?: string;
	children?: ReactNode;
	icon?: FC<LucideProps>;
}) => (
	<Card className={cn('flex-1', className)}>
		<CardHeader>
			<CardTitle className="flex gap-2">
				<Icon className="text-red-600 rounded-full" />
				{title}
			</CardTitle>
			<CardDescription>{message}</CardDescription>
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);
