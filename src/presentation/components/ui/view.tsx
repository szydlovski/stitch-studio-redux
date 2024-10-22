'use client';
import { cn } from '@lib/utils';
import { Fragment, ReactNode, forwardRef } from 'react';
import { ScrollArea, ScrollBar } from './scroll-area';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from './breadcrumb';
import Link from 'next/link';

interface ContainerProps {
	children?: ReactNode;
	className?: string;
}

export const ViewTitle = ({ children, className }: ContainerProps) => (
	<h1 className={cn('text-xl font-semibold md:text-2xl', className)}>
		{children}
	</h1>
);

export const ViewActions = ({ children, className }: ContainerProps) => (
	<div className={cn('flex gap-2', className)}>{children}</div>
);

export const ViewHeader = ({ children, className }: ContainerProps) => (
	<div
		className={cn(
			'flex justify-between items-center border-b bg-background',
			className
		)}
	>
		<div className="max-w-screen-2xl w-full mx-auto">{children}</div>
	</div>
);

export const ViewFooter = ({ children, className }: ContainerProps) => (
	<div className={cn('flex border-t bg-background', className)}>
		<div className="max-w-screen-2xl w-full mx-auto px-6 py-2 flex">
			{children}
		</div>
	</div>
);

interface ViewContentProps {
	children?: ReactNode;
	className?: string;
	fullWidth?: boolean;
	scrollX?: boolean;
}

export const ViewContent = forwardRef<HTMLDivElement, ViewContentProps>(
	({ children, className, fullWidth, scrollX }, ref) => (
		<div
			ref={ref}
			className={cn('max-w-screen-2xl w-full mx-auto flex-1', className)}
		>
			<ScrollArea className={cn('flex flex-col h-full')}>
				<div
					className={cn('h-1', {
						'max-w-screen-md mx-auto': !fullWidth,
					})}
				>
					{children}
				</div>
				{scrollX && <ScrollBar orientation="horizontal" />}
			</ScrollArea>
		</div>
	)
);

ViewContent.displayName = 'ViewContent';

export const View = ({ children, className }: ContainerProps) => (
	<div className={cn('flex flex-1 flex-col h-full bg-muted', className)}>
		{children}
	</div>
);

interface BreadcrumbItem {
	label: string;
	href: string;
}
interface ViewBreadcrumbsProps {
	items: BreadcrumbItem[];
	page: ReactNode;
}

export const ViewBreadcrumbs = ({ items, page }: ViewBreadcrumbsProps) => {
	return (
		<div className="flex flex-col py-3 px-6 gap-4 border-b bg-background">
			<div className='max-w-screen-2xl w-full mx-auto px-6'>
				<Breadcrumb>
					<BreadcrumbList>
						{items.map(({ label, href }, index) => (
							<Fragment key={index}>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href={href}>{label}</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</Fragment>
						))}
						<BreadcrumbItem>
							<BreadcrumbPage>{page}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</div>
	);
};
