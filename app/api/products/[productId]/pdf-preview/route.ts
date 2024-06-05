import { ProductDetails } from '@/context/product/domain/ProductDetails';
import { GetProductQuery } from '@/context/product/infrastructure/query/GetProductQuery';
import { renderPatternFileHtml } from '@/lib/PdfRenderer/renderPatternFileHtml';
import { routeHandler } from '@/lib/routeHandler';
import { NextResponse } from 'next/server';

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
