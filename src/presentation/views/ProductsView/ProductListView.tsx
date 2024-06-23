'use client';
import {
	STITCH_COVEN_RECORD_ID,
	TEST_BRAND_RECORD_ID,
} from '@application/product';
import {
	StitchFairyCoModule
} from '@brand/StitchFairyCo';
import {
	Button,
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	View,
	ViewActions,
	ViewContent,
	ViewFooter,
	ViewHeader,
	ViewTitle,
} from '@components/ui';
import { WandSparklesIcon } from 'lucide-react';
import { useState } from 'react';
import { QueryParamConfig, useQueryParam } from 'use-query-params';
import { CreateProductDialog } from './CreateProduct/CreateProductDialog';
import { MultiSelect } from './MultiSelect';
import { ProductList } from './ProductList/ProductList';

export const ArrayParam: QueryParamConfig<string[] | undefined> = {
	encode: (value) => {
		if (!value || value.length === 0) return null;
		return value;
	},
	decode: (input) => {
		if (input === null || input === undefined) return undefined;
		if (typeof input === 'string') {
			if (input === '') return undefined;
			return [input];
		}
		if (input.length === 0) return undefined;
		return input.filter<string>((i): i is string => typeof i === 'string');
	},
};

export const ProductListView = () => {
	const [brands = [], setBrands] = useQueryParam('brand', ArrayParam);
	// const [brands, setBrands] = useState<string[]>([]);
	const [crafts, setCrafts] = useState<string[]>([]);
	return (
		<View className="bg-muted/40">
			<ViewHeader>
				<ViewTitle>{'Products'}</ViewTitle>
				<ViewActions>
					<CreateProductDialog>
						<Button className="flex gap-2" size="xs">
							<WandSparklesIcon size={16} />
							Create product
						</Button>
					</CreateProductDialog>
				</ViewActions>
			</ViewHeader>
			<ViewHeader className="py-2 md:py-4 px-6">
				<div className="flex gap-2">
					<MultiSelect
						values={crafts}
						onValuesChange={setCrafts}
						placeholder="Product Type"
						options={[
							{
								label: 'Cross Stitch',
								value: 'cross-stitch',
							},
							{
								label: 'Seamless',
								value: 'seamless',
							},
						]}
					/>
					<MultiSelect
						values={brands}
						onValuesChange={setBrands}
						placeholder="Brand"
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
					{/* <SelectInput
						disabled
						placeholder="Brand"
						value="stitchfairyco"
						groups={[
							{
								options: [
									{
										label: 'StitchFairyCo',
										value: 'stitchfairyco',
									},
									{
										label: 'Stitch Coven',
										value: 'stitchcoven',
									},
								],
							},
						]}
					/> */}
				</div>
			</ViewHeader>
			<ViewContent fullWidth className="bg-muted">
				<div className="p-6">
					<ProductList brand={brands} />
				</div>
			</ViewContent>
			<ViewFooter>
				<div>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href="#" />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#" isActive>
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">3</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href="#" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
				<div className="ml-auto">
					<Select defaultValue="16" disabled>
						<SelectTrigger className="w-[65px]">
							<SelectValue placeholder="Products per page" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="16">16</SelectItem>
								<SelectItem value="32">32</SelectItem>
								<SelectItem value="64">64</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</ViewFooter>
		</View>
	);
};
