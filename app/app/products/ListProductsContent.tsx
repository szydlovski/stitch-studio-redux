'use client';
import { ListProductsRecord } from '@/app/api/products/route';
import { DashboardViewLayout } from '@/components/DashboardViewLayout';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { CreateProductDialog } from './CreateProductDialog';

const ProductTileSkeleton = () => (
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

export const ListProductsContent = () => {
	const { data, status } = useQuery<ListProductsRecord[]>({
		queryKey: ['listProducts'],
		queryFn: () => fetch('/api/products').then((res) => res.json()),
	});

	return (
		<DashboardViewLayout title={'Products'} action={<CreateProductDialog />}>
			{status === 'error' ? (
				<>Error</>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
					{status === 'pending'
						? Array(12)
								.fill(0)
								.map((_, i) => {
									return <ProductTileSkeleton key={i} />;
								})
						: data.map(({ id, title, thumbnail, author }) => {
								return (
									<Link key={id} href={`/app/products/${id}`}>
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
						  })}
				</div>
			)}
		</DashboardViewLayout>
	);
};
