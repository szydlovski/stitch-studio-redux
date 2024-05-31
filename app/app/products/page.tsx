import { DashboardViewLayout } from '@/components/DashboardViewLayout';
import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { CreateProductDialog } from './CreateProductDialog';
import { getXataClient } from '@/lib/xata';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';
import { listProducts } from '../../../actions/listProducts';

const ListProductsContent = async () => {
	const products = await listProducts();

	return (
		<DashboardViewLayout title={'Products'} action={<CreateProductDialog />}>
			<div className="grid grid-cols-4 gap-4">
				{products.map(({ id, title, thumbnail, author }) => {
					return (
						<Link key={id} href={`/app/products/${id}`}>
							<Card>
								<CardContent className="p-0 bg-neutral-100 aspect-square">
									<div className="h-full w-full  flex justify-center items-center p-4">
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
		</DashboardViewLayout>
	);
};

export default function ProductsPage() {
	return (
		<DashboardLayout>
			<ListProductsContent />
		</DashboardLayout>
	);
}
