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
import { MockupSettingsModal } from './MockupSettingsModal';
import { FullProductObject } from '@domain/product';

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

interface ChecklistItemConfig {
	key: LanuchItem;
	label: string;
	checked?: boolean;
	content?: ReactNode;
}

enum LanuchItem {
	UploadDesign = 'upload_design',
	CustomizeMockup = 'customize_mockup',
	CustomizePrintable = 'customize_printable',
	CustomizeCovers = 'customize_covers',
	PublishOnEtsy = 'publish_on_etsy',
	Done = 'done',
}

const items: ChecklistItemConfig[] = [
	{
		key: LanuchItem.UploadDesign,
		label: 'Upload design',
		checked: true,
	},
	{
		key: LanuchItem.CustomizeMockup,
		label: 'Customize mockup',
		content: (
			<div className="grid gap-2 py-2">
				<p className="text-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
				<div>
					<MockupSettingsModal>
						<Button variant="outline">Open mockup settings</Button>
					</MockupSettingsModal>
				</div>
			</div>
		),
	},
	{
		key: LanuchItem.CustomizePrintable,
		label: 'Customize printable',
		content: (
			<div className="grid gap-2 py-2">
				<p className="text-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
				<div>
					<MockupSettingsModal>
						<Button variant="outline">Open printable settings</Button>
					</MockupSettingsModal>
				</div>
			</div>
		),
	},
	{
		key: LanuchItem.CustomizeCovers,
		label: 'Customize covers',
	},
	{
		key: LanuchItem.PublishOnEtsy,
		label: 'Publish on Etsy',
	},
];

const getActiveItem = (product: FullProductObject) => {
	const { attributes } = product;
	if (!attributes.hoopConfig) return LanuchItem.CustomizeMockup;
	if (!attributes.printableConfig) return LanuchItem.CustomizePrintable;
	if (!attributes.coverConfig) return LanuchItem.CustomizeCovers;
	if (!attributes.etsyPublishedListingPayload) return LanuchItem.PublishOnEtsy;
	return LanuchItem.Done;
};

export const LaunchChecklistCard = () => {
	const { product, pattern } = useProductContext();
	const activeItem = getActiveItem(product);
	const activeIndex = items.findIndex((item) => item.key === activeItem);
	return (
		<Card className="bg-violet-600 text-white border-violet-600">
			<CardHeader>
				<CardTitle>{'Launch Checklist'}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4">
					{items.map(({ key, label, checked, content }, index) =>
						key === activeItem ? (
							<ActiveChecklistItem
								title={label}
								number={index + 1}
								status="active"
							>
								{content}
							</ActiveChecklistItem>
						) : (
							<ChecklistItem
								title={label}
								number={index + 1}
								status={activeIndex >= index ? 'completed' : 'inactive'}
							/>
						)
					)}
				</div>
			</CardContent>
		</Card>
	);
};
