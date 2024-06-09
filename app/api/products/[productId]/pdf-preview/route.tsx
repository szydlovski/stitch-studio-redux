import { StitchFairyCoPdf } from '@/brand/StitchFairyCo/pdf/StitchFairyCoPdf';
import { ProductDetails } from '@/domain/product/ProductDetails';
import { GetProductQuery } from '@/infrastructure/product/query/GetProductQuery';
import { DocumentContainer } from '@/lib/pdf/DocumentContainer';
import { routeHandler } from '@/lib/routeHandler';
import { NextResponse } from 'next/server';

const renderPatternFileHtml = async (product: ProductDetails) => {
	const renderToString = (await import('react-dom/server')).renderToString;
	return renderToString(
		<DocumentContainer title={`[PREVIEW] ${product.title}`}>
			<StitchFairyCoPdf product={product} />
		</DocumentContainer>
	);
};

export const GET = routeHandler<{ productId: string }>(
	async ({ xata, params: { productId } }) => {
		const attrs = await new GetProductQuery(xata).execute(productId);
		const htmlContent = await renderPatternFileHtml(
			ProductDetails.fromAttributes(attrs)
		);
		return new NextResponse(htmlContent, {
			headers: {
				'Content-Type': 'text/html',
			},
		});
	},
	{
		auth: true,
	}
);
