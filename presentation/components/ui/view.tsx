'use client';
import { cn } from '@/lib';
import { ReactNode } from 'react';
import { ScrollArea } from './scroll-area';

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
		className={cn('flex justify-between items-center px-6 py-2 md:py-6 border-b', className)}
	>
		{children}
	</div>
);

export const ViewFooter = ({ children, className }: ContainerProps) => (
	<div className={cn('flex px-6 py-2 border-t', className)}>{children}</div>
);

export const ViewContent = ({ children, className }: ContainerProps) => (
	<div className={cn('flex-1', className)}>
		<ScrollArea className="flex flex-col h-full">
			<div className="h-1">{children}</div>
		</ScrollArea>
	</div>
);

export const View = ({ children, className }: ContainerProps) => (
	<div className={cn('flex flex-1 flex-col h-full', className)}>{children}</div>
);
