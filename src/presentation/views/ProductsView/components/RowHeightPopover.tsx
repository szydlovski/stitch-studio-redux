'use client';
import {
	Button,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@components/ui';
import { Switch } from '@components/ui/switch';
import { EyeIcon } from 'lucide-react';
import { useProductsViewContext } from '../ProductsViewContext';

export const RowHeightPopover = () => {
	const { table } = useProductsViewContext();
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="gap-2 hidden md:flex" variant="outline">
					<EyeIcon size={16} />
					<span>Show</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex flex-col gap-2 w-56">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => (
						<div key={column.id} className="flex items-center space-x-2">
							<Switch
								size="xs"
								id={column.id}
								checked={column.getIsVisible()}
								onClick={() => column.toggleVisibility()}
							/>
							<Label htmlFor={column.id} className="text-xs">
								{column.id}
							</Label>
						</div>
					))}
			</PopoverContent>
		</Popover>
	);
};
