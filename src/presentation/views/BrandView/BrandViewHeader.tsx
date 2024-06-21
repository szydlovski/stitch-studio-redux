'use client';
import { ViewBreadcrumbs, ViewHeader, ViewTitle } from '@components/ui';
import { transformImage } from '@xata.io/client';
import Image from 'next/image';
import { useBrandViewContext } from './BrandViewContext';

export const BrandViewHeader = () => {
	const {
		brand: {
			name,
			logo: { src },
		},
	} = useBrandViewContext();
	return (
		<>
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
		</>
	);
};
