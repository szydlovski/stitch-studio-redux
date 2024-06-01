'use client';
import { DataSet } from '@/components/DataSet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { EditTitleDialog } from './EditTitleDialog';
import { useProductContext } from './components/ProductContext';

export const MainCard = () => {
	const { product, pattern } = useProductContext();
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex gap-4">
					<span>{product.title}</span>
					<div>
						<EditTitleDialog initialValue={product.title} />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2">
				<div className="flex flex-col gap-6">
					<DataSet label="Author">
						{product.author?.name ?? product.author?.email}
					</DataSet>
					<DataSet label="Brand">{product.brand?.name}</DataSet>
					<DataSet label="Created at">
						{/* {product.xata.createdAt.toLocaleString()} */}
					</DataSet>
					<DataSet label="Updated at">
						{/* {product.xata.updatedAt.toLocaleString()} */}
					</DataSet>
					<DataSet label="Dimensions">{pattern.dimensionsText}</DataSet>
					<DataSet label="Stitches">{pattern.stitchCount}</DataSet>
					<DataSet label="Colors">{pattern.colorCount}</DataSet>
				</div>
				<div className="w-full h-full">
					<div className="aspect-square bg-neutral-200 flex justify-center items-center p-4 max-h-[400px] ml-auto">
						<img src={product.thumbnail.src} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export const PaletteCard = () => {
	const { pattern } = useProductContext();
	return (
		<Card>
			<CardHeader>
				<CardTitle>{'Palette'}</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-2">
				{pattern.groups.map((color) => (
					<div key={color.hex} className="">
						<div
							className="h-10 rounded-sm border"
							style={{ backgroundColor: color.hex }}
						/>
						<div className="text-sm">{color.hex}</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export const SingleProductContent = () => {
	const { product, pattern } = useProductContext();
	return (
		<div className="flex flex-col p-6 gap-4 bg-muted/40">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/app/products">Products</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{product.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<MainCard />
			<PaletteCard />
		</div>
	);
};
