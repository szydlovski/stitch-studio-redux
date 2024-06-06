'use client';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useProductContext } from '@/components/context/ProductContext';
import { CoversCard } from '@/application/product/ProductCards/CoversCard';
import { DangerZoneCard } from '@/application/product/ProductCards/DangerZoneCard';
import { ProductCard } from '@/application/product/ProductCards/ProductCard';
import { PdfCard } from '@/application/product/ProductCards/PdfCard';

export const SingleProductContent = () => {
	const { product } = useProductContext();
	return (
		<div className="flex flex-col p-6 gap-4 bg-muted/40">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/studio/products">Products</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{product.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<ProductCard />
			<CoversCard />
			<PdfCard />
			<DangerZoneCard />
		</div>
	);
};
