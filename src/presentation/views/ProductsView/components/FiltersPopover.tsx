'use client';
import {
	STITCH_COVEN_RECORD_ID,
	TEST_BRAND_RECORD_ID,
} from '@application/product';
import { StitchFairyCoModule } from '@brand/StitchFairyCo';
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@components/ui';
import { FilterIcon } from 'lucide-react';
import { MultiSelect } from './MultiSelect';

import { useProductsViewContext } from '../ProductsViewContext';

export const FiltersPopover = () => {
	const {
		filters: { type, setTypes, brand, setBrands },
	} = useProductsViewContext();
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' className="gap-2 flex">
					<FilterIcon size={16} />
					<span>Filter</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex flex-col gap-2">
				<MultiSelect
					values={type ?? []}
					onValuesChange={setTypes}
					placeholder="All types"
					disabled
					className="w-full"
					options={[
						{
							label: 'Cross Stitch',
							value: 'cross_stitch',
						},
						{
							label: 'Seamless',
							value: 'seamless',
						},
					]}
				/>
				<MultiSelect
					values={brand ?? []}
					onValuesChange={setBrands}
					placeholder="All brands"
					className="w-full"
					options={[
						{
							label: 'StitchFairyCo',
							value: StitchFairyCoModule.brandId,
						},
						{
							label: 'StitchCoven',
							value: STITCH_COVEN_RECORD_ID,
						},
						{
							label: 'Test Brand',
							value: TEST_BRAND_RECORD_ID,
						},
					]}
				/>
			</PopoverContent>
		</Popover>
	);
};
