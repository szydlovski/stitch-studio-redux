'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductItem } from '@/domain/product/ProductItem';
import Image from 'next/image';
import Link from 'next/link';

interface ProductTileProps {
	product: ProductItem;
}

export const ProductTile = ({
	product: { id, title, thumbnail, author },
}: ProductTileProps) => {
	return (
		<Link key={id} href={`/studio/products/${id}`}>
			<Card>
				<CardContent className="p-0 bg-neutral-100 aspect-square">
					<div className="h-full w-full flex justify-center items-center p-2 md:p-4">
						<Image
							src={thumbnail.src}
							alt={title}
							width={thumbnail.width}
							height={thumbnail.height}
						/>
					</div>
				</CardContent>
				<CardHeader className="p-2">
					<CardTitle className="text-sm"> {title}</CardTitle>
					<CardDescription className="text-xs">
						Author: {author.name}
					</CardDescription>
				</CardHeader>
			</Card>
		</Link>
	);
};

export const ProductTileSkeleton = () => (
	<Card>
		<CardContent className="p-0 bg-neutral-100 aspect-square">
			<Skeleton className="h-full w-full  flex justify-center items-center p-4" />
		</CardContent>
		<CardHeader className="p-2">
			<Skeleton className="h-5 w-2/3" />
			<Skeleton className="h-4 w-4/5" />
		</CardHeader>
	</Card>
);
