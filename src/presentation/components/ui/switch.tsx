'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const switchVariants = cva(
	'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
	{
		variants: {
			size: {
				lg: 'h-6 w-11',
				md: 'h-5 w-9',
				sm: 'h-4 w-7',
				xs: 'h-3 w-5',
			},
		},
		defaultVariants: {
			size: 'lg',
		},
	}
);

const switchThumbVariants = cva(
	'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0',
	{
		variants: {
			size: {
				lg: 'h-5 w-5 data-[state=checked]:translate-x-5',
				md: 'h-4 w-4 data-[state=checked]:translate-x-4',
				sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
				xs: 'h-2 w-2 data-[state=checked]:translate-x-2',
			},
		},
		defaultVariants: {
			size: 'lg',
		},
	}
);

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
		VariantProps<typeof switchVariants>
>(({ className, size, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(switchVariants({ size }), className)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
