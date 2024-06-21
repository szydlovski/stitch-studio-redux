import { CrossStitchPattern } from '@domain/cross-stitch';
import { GetProductQuery } from '@infrastructure/product/GetProductQuery';
import { SinglePageLayout } from '@presentation/layout';
import { CrossStitchEditView } from '@presentation/views/CrossStitchEdit';
import { redirect } from 'next/navigation';

export default async function Page({
	searchParams: { productId },
}: {
	searchParams: { productId: string };
}) {
	const product = await new GetProductQuery().execute(productId);
	return (
		<SinglePageLayout header={'Cross Stitch Editor'}>
			{productId ? (
				<CrossStitchEditView patternData={product.data} />
			) : (
				<>No product selected</>
			)}
		</SinglePageLayout>
	);
}
