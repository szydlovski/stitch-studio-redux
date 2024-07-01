'use client';
import {
	STITCH_COVEN_RECORD_ID,
	TEST_BRAND_RECORD_ID,
	useListProducts,
} from '@application/product';
import { StitchFairyCoModule } from '@brand/StitchFairyCo';
import { ErrorAlert } from '@components/ErrorAlert';
import { QueryStatusGuard } from '@components/guard';
import {
	Button,
	PaginationItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Tabs,
	TabsList,
	TabsTrigger,
	View,
	ViewActions,
	ViewContent,
	ViewFooter,
	ViewHeader,
	ViewTitle,
} from '@components/ui';
import { BaseProductObject } from '@domain/product';
import {
	ArrowLeft,
	ArrowLeftIcon,
	ArrowRightIcon,
	ChevronLeft,
	ChevronRight,
	FilterIcon,
	Grid2X2Icon,
	LucideIcon,
	PlayIcon,
	Rows3Icon,
	SkipBackIcon,
	WandSparklesIcon,
} from 'lucide-react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
	NumberParam,
	QueryParamConfig,
	createEnumParam,
	useQueryParam,
	withDefault,
} from 'use-query-params';
import { CreateProductDialog } from './CreateProduct/CreateProductDialog';
import { MultiSelect } from './MultiSelect';
import { ProductList, ProductListSkeleton } from './ProductList/ProductList';
import { ProductsTable } from './ProductsTable';

import img from '@/public/logo_3x.png';
import { cn } from '@lib/utils';

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

const generatePagination = (
	page: number,
	maxPage: number
): (number | '...')[] => {
	return Array.from(
		new Set([
			1,
			2,
			3,
			page - 1,
			page,
			page + 1,
			maxPage,
			maxPage - 1,
			maxPage - 2,
		])
	)
		.filter((p) => p > 0 && p <= maxPage)
		.sort((a, b) => a - b)
		.flatMap((p, i, arr) => {
			if (i === 0) return [p];
			const previous = arr[i - 1];
			if (p - previous === 1) return [p];
			return ['...', p];
		});
};

enum ProductsViewMode {
	Grid = 'grid',
	List = 'list',
}

const VIEW_MODE_CONFIG: Record<
	ProductsViewMode,
	{
		icon: LucideIcon;
		Content: (props: { products: BaseProductObject[] }) => ReactNode;
		Loading: () => ReactNode;
	}
> = {
	[ProductsViewMode.Grid]: {
		icon: Grid2X2Icon,
		Content: ({ products }) => {
			return (
				<div className="p-6">
					<ProductList products={products} />
				</div>
			);
		},
		Loading: () => {
			return (
				<div className="p-6">
					<ProductListSkeleton />
				</div>
			);
		},
	},
	[ProductsViewMode.List]: {
		icon: Rows3Icon,
		Content: ({ products }) => {
			return (
				<div>
					<ProductsTable products={products} />
				</div>
			);
		},
		Loading: () => {
			return <span>loading</span>;
		},
	},
};

export const ProductListView = () => {
	const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1));
	const [pageSize, setPageSize] = useQueryParam(
		'pageSize',
		withDefault(NumberParam, 16)
	);
	const [type, setTypes] = useState<string[]>([]);
	const [brand, setBrands] = useQueryParam('brand', ArrayParam);

	const { data, status } = useListProducts({
		brand,
		limit: pageSize,
		offset: (page - 1) * pageSize,
	});

	const total = data?.total ?? 0;

	const maxPage = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);
	const [viewMode, setViewMode] = useQueryParam(
		'mode',
		withDefault(
			createEnumParam(Object.values(ProductsViewMode)),
			ProductsViewMode.Grid
		)
	);

	// reset page when brand changes
	useEffect(() => {
		setPage(1);
	}, [brand, setPage]);

	const { Loading, Content } = VIEW_MODE_CONFIG[viewMode];
	return (
		<Tabs
			value={viewMode}
			onValueChange={(value) => setViewMode(value as ProductsViewMode)}
			asChild
		>
			<View className="">
				<ViewHeader className="">
					<div className="flex gap-2 w-full">
						<div className="hidden md:flex gap-2">
							<MultiSelect
								values={type ?? []}
								onValuesChange={setTypes}
								placeholder="All types"
								disabled
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
						</div>
						<TabsList className="ml-auto">
							{Object.entries(VIEW_MODE_CONFIG).map(
								([mode, { icon: Icon }]) => (
									<TabsTrigger key={mode} value={mode}>
										<Icon size={16} />
									</TabsTrigger>
								)
							)}
						</TabsList>
						<Popover>
							<PopoverTrigger asChild>
								<Button className="gap-2 flex md:hidden">
									<FilterIcon size={16} />
									<span className="hidden md:inline">Filter</span>
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
						<CreateProductDialog>
							<Button className="flex gap-2">
								<WandSparklesIcon size={16} />
								<span className="hidden md:inline">Create product</span>
							</Button>
						</CreateProductDialog>
					</div>
				</ViewHeader>
				<ViewContent fullWidth scrollX className="bg-muted">
					<QueryStatusGuard
						props={data}
						status={status}
						loadingContent={<Loading />}
						errorContent={
							<ErrorAlert
								title={'Error'}
								description={
									'An error occurred while fetching products. Please try again later.'
								}
							/>
						}
					>
						{({ products }) => <Content products={products} />}
					</QueryStatusGuard>
				</ViewContent>
				<ViewFooter className="flex flex-row">
					<div className="basis-2/12 flex items-center">
						<span className="text-sm">
							{status === 'pending'
								? 'Loading...'
								: `Showing ${(page - 1) * pageSize + 1}-${Math.min(
										page * pageSize,
										total
								  )} of ${total} products`}
						</span>
					</div>
					<div className="flex-1 flex justify-center">
						<Button
							size="xs"
							variant="ghost"
							disabled={page === 1}
							onClick={() => setPage(page - 1)}
						>
							<ChevronLeft size={16} />
						</Button>
						<div>
							{generatePagination(page, maxPage).map((p) => {
								if (p === '...') return null;
								return <PaginationItem></PaginationItem>;
							})}
						</div>
						{/* <MyPagination page={page} maxPage={maxPage} onPageChange={setPage} /> */}
						<Button
							size="xs"
							variant="ghost"
							disabled={!data?.total || page * pageSize >= data.total}
							onClick={() => setPage(page + 1)}
						>
							<ChevronRight size={16} />
						</Button>
					</div>
					<div className="basis-2/12 flex justify-end">
						<Select
							value={pageSize.toString()}
							onValueChange={(value) => setPageSize(Number(value))}
						>
							<SelectTrigger className="h-[30px] w-[65px]">
								<SelectValue placeholder="Products per page" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{[16, 24, 32, 64].map((size) => (
										<SelectItem key={size} value={size.toString()}>
											{size}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</ViewFooter>
			</View>
		</Tabs>
	);
};

export const MyPagination = ({
	page,
	maxPage,
	onPageChange,
}: {
	page: number;
	maxPage: number;
	onPageChange: (page: number) => void;
}) => {
	return (
		<div className="flex gap-1 items-center">
			{generatePagination(page, maxPage).map((p, index) => {
				const classNames =
					'h-7 w-7 text-xs flex justify-center items-center text-muted-foreground rounded-full font-semibold';
				if (p === '...')
					return (
						<div key={index} className={classNames}>
							{'...'}
						</div>
					);
				return (
					<button
						key={index}
						onClick={() => onPageChange(p)}
						className={cn(classNames, {
							'border bg-foreground text-background': p === page,
						})}
					>
						{p}
					</button>
				);
			})}
		</div>
	);
};
