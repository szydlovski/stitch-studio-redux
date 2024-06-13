'use client';
import { CoverGeneratorDialog } from '@/application/product-image/CoverGenerator/CoverGeneratorDialog';
import { ProductImageItem } from '@/domain/product-image/ProductImageItem';
import { ProductApiClient } from '@/infrastructure/product/ProductApiClient';
import { useProductContext } from '@/presentation/components/context/ProductContext';
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from '@/presentation/components/ui';
import { useQuery } from '@tanstack/react-query';
import { transformImage } from '@xata.io/client';
import { EllipsisIcon } from 'lucide-react';
import Link from 'next/link';

export const GetProductImagesQueryKey = (productId: string) => [
	'productImages',
	productId,
];

export const useGetProductImages = (productId: string) => {
	return useQuery({
		queryKey: GetProductImagesQueryKey(productId),
		queryFn: () => new ProductApiClient().getImages(productId),
		select: (images) => images.map(ProductImageItem.fromAttributes),
	});
};

export const CoversCard = () => {
	const { product } = useProductContext();
	const { data: images } = useGetProductImages(product.id);
	return (
		<div className="flex flex-wrap gap-4">
			{images&& [...images,...images,...images,...images,...images,...images].map(({ src, tags }, i) => (
				<div
					key={i}
					className="flex flex-col gap-2 border rounded-md p-2 group relative"
				>
					<img
						className="object-cover"
						src={transformImage(src, { height: 150 })}
					/>
					<div className="">
						<ul>
							{tags.map((tag) => (
								<li key={tag}>
									<Badge variant="outline">{tag}</Badge>
								</li>
							))}
						</ul>
					</div>
					<div className="absolute top-0 right-0 p-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="flex py-0.5 px-1 h-auto bg-transparent hover:bg-foreground/10 text-foreground">
									<EllipsisIcon size={16} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<Link href={'#'}>{'Test item'}</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			))}
		</div>
	);
};
