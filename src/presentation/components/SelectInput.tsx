'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@components/ui';
import React from 'react';

interface SelectOption {
	label: string;
	value: string;
}

interface SelectOptionGroup {
	label?: string;
	options: SelectOption[];
}

interface SelectInputProps
	extends Omit<React.ComponentPropsWithoutRef<typeof Select>, 'children'> {
	groups: SelectOptionGroup[];
	placeholder?: string;
}

export const SelectInput = React.forwardRef<
	React.ElementRef<typeof SelectValue>,
	SelectInputProps
>(({ groups, placeholder, ...props }, ref) => {
	return (
		<Select {...props}>
			<SelectTrigger className="x w-48">
				<SelectValue ref={ref} placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{groups.map(({ label, options }, i) => (
					<SelectGroup key={i}>
						{label && <SelectLabel>{label}</SelectLabel>}
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				))}
			</SelectContent>
		</Select>
	);
});
