import { DashboardViewLayout } from '@/components/DashboardViewLayout';
import { DataSet } from '@/components/DataSet';
import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Pattern } from '@/lib/pattern/pattern';
import { getXataClient } from '@/lib/xata';
import { EditTitleDialog } from './EditTitleDialog';

const ListProductsContent = async ({ productId }: { productId: string }) => {
	const product = await getXataClient()
		.db.product.select([
			'*',
			'thumbnail.signedUrl',
			'brand.name',
			'author.name',
			'author.email',
		])
		.filter({ id: productId })
		.getFirstOrThrow();
	const pattern = Pattern.fromData(product.data);
	return (
		<DashboardViewLayout
			breadcrumbs={
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
			}
		>
			<Card>
				<CardHeader>
					<CardTitle className="flex gap-4">
						<span>{product.title}</span>
						<div>
							<EditTitleDialog initialValue={product.title} />
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-2">
					<div className="flex flex-col gap-6">
						<DataSet label="Author">
							{product.author?.name ?? product.author?.email}
						</DataSet>
						<DataSet label="Brand">{product.brand?.name}</DataSet>
						<DataSet label="Created at">
							{product.xata.createdAt.toLocaleString()}
						</DataSet>
						<DataSet label="Updated at">
							{product.xata.updatedAt.toLocaleString()}
						</DataSet>
						<DataSet label="Dimensions">{pattern.dimensionsText}</DataSet>
						<DataSet label="Stitches">{pattern.stitchCount}</DataSet>
						<DataSet label="Colors">{pattern.colorCount}</DataSet>
					</div>
					<div className="w-full h-full">
						<div className="aspect-square bg-neutral-200 flex justify-center items-center p-4 max-h-[400px] ml-auto">
							<img src={product.thumbnail?.signedUrl} />
						</div>
					</div>
				</CardContent>
			</Card>
		</DashboardViewLayout>
	);
};

export default function ProductPage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	return (
		<DashboardLayout>
			<ListProductsContent productId={productId} />
		</DashboardLayout>
	);
}
