import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground',
				secondary: 'border-transparent bg-secondary text-secondary-foreground',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground',
				error: 'border-transparent bg-rose-600 text-white',
				success:
					'border-transparent bg-emerald-600 text-white',
				outline: 'text-foreground',
			},
			size: {
				xs: 'text-xs px-2 py-0.5',
				sm: 'text-sm px-4 py-1.5',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'xs',
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant, size }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
