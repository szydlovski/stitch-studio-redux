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
	Grid2X2Icon,
	LucideIcon,
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

const generatePagination = (page: number, maxPage: number) => {
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
		withDefault(NumberParam, 12)
	);
	const [total, setTotal] = useState(0);
	const maxPage = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);
	const [brand, setBrands] = useQueryParam('brand', ArrayParam);
	const [crafts, setCrafts] = useState<string[]>([]);
	const [viewMode, setViewMode] = useQueryParam(
		'mode',
		withDefault(
			createEnumParam(Object.values(ProductsViewMode)),
			ProductsViewMode.Grid
		)
	);
	const { data, status } = useListProducts({
		brand,
		limit: pageSize,
		offset: (page - 1) * pageSize,
	});

	// reset page when brand changes
	useEffect(() => {
		setPage(1);
	}, [brand, setPage]);
	
	useEffect(() => {
		if (data?.total === undefined) return;
		setTotal(data.total);
	}, [data?.total, setTotal]);
	const { Loading, Content } = VIEW_MODE_CONFIG[viewMode];
	return (
		<Tabs
			value={viewMode}
			onValueChange={(value) => setViewMode(value as ProductsViewMode)}
			asChild
		>
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
					<div className="flex gap-2 w-full">
						{/* <MultiSelect
							values={crafts}
							onValuesChange={setCrafts}
							placeholder="Product Type"
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
						/> */}
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
						<TabsList className="ml-auto">
							{Object.entries(VIEW_MODE_CONFIG).map(
								([mode, { icon: Icon }]) => (
									<TabsTrigger key={mode} value={mode}>
										<Icon size={16} />
									</TabsTrigger>
								)
							)}
						</TabsList>
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
				<ViewFooter>
					<div>
						<span>{`Showing ${(page - 1) * pageSize + 1} to ${Math.min(
							page * pageSize,
							total
						)} of ${total}`}</span>
					</div>
					<div className="ml-auto flex">
						<Button
							size="xs"
							variant="ghost"
							disabled={page === 1}
							onClick={() => setPage(page - 1)}
						>
							<ArrowLeftIcon size={16} />
						</Button>
						<div className="flex gap-1 items-center">
							{generatePagination(page, maxPage).map((p, index) => (
								<button
								key={'' + p + index}
								disabled={typeof p !== 'number'}
								onClick={() => typeof p === 'number' && setPage(p)}
									className={cn(
										'h-6 w-8 flex justify-center items-center text-muted-foreground',
										{
											'border bg-background font-semibold': p === page,
										}
									)}
								>
									{p}
								</button>
							))}
						</div>
						<Button
							size="xs"
							variant="ghost"
							disabled={!data?.total || page * pageSize >= data.total}
							onClick={() => setPage(page + 1)}
						>
							<ArrowRightIcon size={16} />
						</Button>
					</div>
					{/* <div className="ml-auto">
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
					</div> */}
				</ViewFooter>
			</View>
		</Tabs>
	);
};
