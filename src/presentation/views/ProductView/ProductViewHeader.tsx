'use client';
import { useProductContext } from '@presentation/views/ProductView/ProductContext';
import Image from 'next/image';

import Link from 'next/link';
import { BrandHoverCard } from './BrandHoverCard';

export const ProductViewHeader = () => {
	const { product } = useProductContext();
	return (
		<div className="flex gap-4 p-6">
			<div className="h-full">
				<div className="relative group border rounded-md p-2 overflow-hidden">
					<Image
						className="h-[100px] w-[100px]"
						width={100}
						height={100}
						alt={product.title}
						src={product.thumbnail.src}
					/>
					<div className="absolute w-full h-full top-0 left-0 flex flex-wrap items-end justify-items-end content-end opacity-0 group-hover:opacity-100 transition-all">
						{product.pattern.groups.map((group) => (
							<div
								className="h-2 flex-1"
								key={group.id}
								style={{ backgroundColor: group.hex }}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Title</span>
						<h2 className="text-xl font-semibold">{product.title}</h2>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Type</span>
						<h2 className="text-sm">{'Cross Stitch Pattern'}</h2>
					</div>
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Author</span>
						<h2 className="text-sm">{product.author?.name}</h2>
					</div>
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Brand</span>
						<BrandHoverCard brand={product.brand.name}>
							<Link
								className="text-sm"
								href={`/studio/brands/${product.brand.id}`}
							>
								{product.brand?.name}
							</Link>
						</BrandHoverCard>
					</div>
				</div>
			</div>
		</div>
	);
};
