'use client';
import { BrandDetails } from '@/domain/brand/BrandDetails';
import {
	View,
	ViewBreadcrumbs,
	ViewContent,
	ViewHeader,
	ViewTitle,
} from '@/presentation/components/ui/view';
import { DashboardLayout } from '@/presentation/layout';
import { transformImage } from '@xata.io/client';
import Image from 'next/image';
import { EtsyCard } from './EtsyCard';

interface BrandDetailsViewProps {
	brandId: string;
	brand: BrandDetails;
}

export const BrandView = async ({ brand }: BrandDetailsViewProps) => {
	const { name, src } = brand;
	return (
		<View>
			<ViewBreadcrumbs
				items={[
					{
						label: 'Brands',
						href: '/studio/brands',
					},
				]}
				page={name}
			/>
			<ViewHeader className="flex flex-col gap-4">
				<Image
					className="rounded-full border"
					src={transformImage(src, { width: 200 })}
					width={200}
					height={200}
					alt={name}
				/>
				<ViewTitle>{name}</ViewTitle>
			</ViewHeader>
			<ViewContent className="p-6 bg-muted">
				<EtsyCard brand={brand} />
			</ViewContent>
		</View>
	);
};
