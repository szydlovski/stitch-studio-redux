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

const mainContainerClasses = 'max-w-screen-2xl w-full mx-auto';
export const responsivePaddingX = 'px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10';
export const responsiveGap = 'gap-2 sm:gap-4 lg:gap-5';
export const responsivePaddingYMuted = 'py-1 sm:py-2 lg:py-3 xl:py-4';
export const responsiveGridPaddingY = 'py-2 sm:py-4 lg:py-5';

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
	<div className={cn('flex gap-2 lg:gap-3 xl:gap-4', className)}>{children}</div>
);

export const ViewActionsGroup = ({ children, className }: ContainerProps) => (
	<div className={cn('flex gap-2 lg:gap-3 xl:gap-4', className)}>{children}</div>
);

export const ViewHeader = ({ children, className }: ContainerProps) => (
	<div
		className={cn(
			'flex justify-between items-center border-b bg-background',
			className
		)}
	>
		<div
			className={cn(
				'max-w-screen-2xl w-full mx-auto',
				responsivePaddingX,
				responsivePaddingYMuted
			)}
		>
			{children}
		</div>
	</div>
);

export const ViewFooter = ({ children, className }: ContainerProps) => (
	<div className={cn('flex border-t bg-background', className)}>
		<div
			className={cn(
				'flex',
				mainContainerClasses,
				responsivePaddingX,
				responsivePaddingYMuted
			)}
		>
			{children}
		</div>
	</div>
);

interface ViewContentProps {
	children?: ReactNode;
	className?: string;
	containerClassName?: string;
	fullWidth?: boolean;
	scrollX?: boolean;
	noPadding?: boolean;
}

export const ViewContent = forwardRef<HTMLDivElement, ViewContentProps>(
	({ children, className, containerClassName, fullWidth, scrollX, noPadding }, ref) => (
		<div ref={ref} className={cn('w-full mx-auto flex-1', containerClassName)}>
			<ScrollArea className={cn('flex flex-col h-full w-full')}>
				<div
					className={cn('h-1 w-full', {
						'max-w-screen-2xl mx-auto': !fullWidth,
					})}
				>
					<div
						className={cn(
							className,
							!noPadding && responsiveGridPaddingY,
							!noPadding && responsivePaddingX
						)}
					>
						{children}
					</div>
				</div>
				{scrollX && <ScrollBar orientation="horizontal" />}
			</ScrollArea>
		</div>
	)
);

ViewContent.displayName = 'ViewContent';

export const View = ({ children, className }: ContainerProps) => (
	<div className={cn('flex flex-1 flex-col h-full', className)}>
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
		<div className="flex flex-col gap-4 border-b bg-background">
			<div
				className={cn(
					'max-w-screen-2xl w-full mx-auto',
					responsivePaddingX,
					responsivePaddingYMuted
				)}
			>
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

// export const View = ({ children, className }: ContainerProps) => (
// 	<div
// 		className={cn(
// 			'flex justify-between items-center border-b bg-background',
// 			className
// 		)}
// 	>
// 		<div
// 			className={cn(
// 				'max-w-screen-2xl w-full mx-auto',
// 				responsivePaddingX,
// 				responsivePaddingY
// 			)}
// 		>
// 			{children}
// 		</div>
// 	</div>
// );
