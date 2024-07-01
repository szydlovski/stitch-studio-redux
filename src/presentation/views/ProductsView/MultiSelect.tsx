'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@lib/utils';
import { Button } from '@components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@components/ui/popover';

interface SelectOption<ValueType extends string = string> {
	label: string;
	value: ValueType;
}

interface MultiSelectProps<ValueType extends string = string> {
	values: ValueType[];
	options: SelectOption<ValueType>[];
	onValuesChange: (values: ValueType[]) => void;
	onSelectedOptionsChange?: (options: SelectOption<ValueType>[]) => void;
	placeholder?: string;
	searchable?: boolean;
	searchPlaceholder?: string;
	disabled?: boolean;
	className?: string;
}

export const MultiSelect = <ValueType extends string = string>({
	values,
	options,
	onValuesChange,
	onSelectedOptionsChange,
	placeholder = 'Select options...',
	searchable = false,
	searchPlaceholder = 'Search options...',
	disabled = false,
	className,
}: MultiSelectProps<ValueType>) => {
	const [open, setOpen] = React.useState(false);
	const selectedOptions = options.filter((framework) =>
		values.includes(framework.value)
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					disabled={disabled}
					className={cn(
						'relative group overflow-hidden w-[200px] justify-between',
						className
					)}
				>
					<span className="text-left flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
						{values.length > 0
							? selectedOptions.map(({ label }) => label).join(', ')
							: placeholder}
					</span>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					{/* <ChevronsUpDown className="absolute right-2.5 ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					{searchable && <CommandInput placeholder={searchPlaceholder} />}
					<CommandList>
						<CommandEmpty>No options found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(rawCurrentValue) => {
										const currentValue = rawCurrentValue as ValueType;
										onValuesChange(
											values.includes(currentValue)
												? values.filter((value) => value !== currentValue)
												: [...values, currentValue]
										);
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											values.includes(option.value)
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
