'use client';
import { DataSet } from '@components/DataSet';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@components/ui';
import { useProductContext } from '@presentation/views/ProductView/ProductContext';
import Image from 'next/image';
import { EditTitleDialog } from './EditTitleDialog';
import { CheckIcon } from 'lucide-react';
import { cn } from '@lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ReactNode } from 'react';

export const checklistNumberVariants = cva(
	'w-6 h-6 border rounded-full flex justify-center items-center text-sm font-semibold',
	{
		variants: {
			status: {
				active: 'border-violet-600 bg-violet-600 text-white',
				completed: 'border-white bg-white text-violet-600',
				inactive: 'border-white',
			},
		},
		defaultVariants: {
			status: 'active',
		},
	}
);

interface ChecklistNumberProps
	extends VariantProps<typeof checklistNumberVariants> {
	number: number;
	className?: string;
}

export const ChecklistNumber = ({ status, number }: ChecklistNumberProps) => {
	const variantClassName = checklistNumberVariants({ status });
	return (
		<div className={cn(variantClassName)}>
			{status !== 'completed' ? (
				number
			) : (
				<CheckIcon strokeWidth={3} size={14} />
			)}
		</div>
	);
};

const ChecklistItem = ({
	title,
	number,
	status,
}: {
	title: string;
	number: number;
	status: 'active' | 'completed' | 'inactive';
}) => {
	return (
		<div
			className={cn('flex items-center gap-3', {
				'opacity-50': status !== 'active',
			})}
		>
			<ChecklistNumber number={number} status={status} />
			<span
				className={cn({
					'line-through': status === 'completed',
					'font-semibold': status === 'active',
				})}
			>
				{title}
			</span>
		</div>
	);
};

const ActiveChecklistItem = ({
	title,
	number,
	status,
	children,
}: {
	title: string;
	number: number;
	status: 'active' | 'completed' | 'inactive';
	children: ReactNode;
}) => {
	return (
		<div className="grid gap-2 p-6 bg-background text-foreground rounded-md">
			<div className="uppercase font-semibold text-xs">Next step</div>
			<ChecklistItem title={title} number={number} status={status} />
			{children}
		</div>
	);
};

interface ChecklistItemConfig {}

export const LaunchChecklistCard = () => {
	const { product, pattern } = useProductContext();
	return (
		<Card className="bg-violet-600 text-white border-violet-600">
			<CardHeader>
				<CardTitle>{'Launch Checklist'}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4">
					<ChecklistItem title="Upload design" number={1} status="completed" />
					<ActiveChecklistItem
						title="Customize mockup"
						number={2}
						status="active"
					>
						<div className="grid gap-2 py-2">
							<p className="text-sm">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</p>
							<div>
								<Button variant="outline">Open mockup settings</Button>
							</div>
						</div>
					</ActiveChecklistItem>
					<ChecklistItem
						title="Customize printable"
						number={3}
						status="inactive"
					/>
					<ChecklistItem
						title="Customize covers"
						number={4}
						status="inactive"
					/>
					<ChecklistItem title="Publish on Etsy" number={5} status="inactive" />
				</div>
			</CardContent>
		</Card>
	);
};
