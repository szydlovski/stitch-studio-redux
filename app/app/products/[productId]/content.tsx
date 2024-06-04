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
import { CoversCard } from '@/context/product/application/ProductCards/CoversCard';
import { DangerZoneCard } from '@/context/product/application/ProductCards/DangerZoneCard';
import { PaletteCard } from '@/context/product/application/ProductCards/PaletteCard';
import { PatternInfoCard } from '@/context/product/application/ProductCards/PatternInfoCard';
import { ProductFilesCard } from '@/context/product/application/ProductCards/ProductFilesCard';

export const SingleProductContent = () => {
	const { product } = useProductContext();
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
			<PatternInfoCard />
			<CoversCard />
			<PaletteCard />
			<ProductFilesCard />
			<DangerZoneCard />
		</div>
	);
};
