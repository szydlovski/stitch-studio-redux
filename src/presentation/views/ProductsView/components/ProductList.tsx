'use client';
import { responsiveGap } from '@components/ui';
import { cn } from '@lib/utils';
import { ReactNode } from 'react';

export const ProductTileGrid = ({
	children,
	small = false,
}: {
	children: ReactNode;
	small?: boolean;
}) => {
	return (
		<div
			className={cn(
				'grid',
				small
					? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8'
					: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6',
				responsiveGap
			)}
		>
			{children}
		</div>
	);
};
