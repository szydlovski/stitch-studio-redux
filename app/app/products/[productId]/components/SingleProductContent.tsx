'use client';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useProductContext } from '../components/ProductContext';
import { MainCard } from './PatternInfoCard';
import { PaletteCard } from './PaletteCard';
import { CoversCard } from './CoversCard';
import { ProductFilesCard } from './ProductFilesCard';

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
			<CoversCard />
			<ProductFilesCard />
		</div>
	);
};
