import { DeleteProductQuery } from '@/infrastructure/product/query/DeleteProductQuery';
import { GetProductQuery } from '@/infrastructure/product/query/GetProductQuery';
import { UpdateProductTitleQuery } from '@/infrastructure/product/query/UpdateProductTitleQuery';
import { routeHandler } from '@/lib/routeHandler';
import { NextResponse } from 'next/server';

export const GET = routeHandler<{ productId: string }>(
	async ({ xata, params: { productId } }) => {
		const product = await new GetProductQuery(xata).execute(productId);
		return NextResponse.json(product);
	},
	{
		auth: true,
	}
);

export const PATCH = routeHandler<{ productId: string }>(
	async ({ req, xata, params: { productId } }) => {
		const body = await req.json();
		const result = await new UpdateProductTitleQuery(xata).execute(
			productId,
			body.title
		);
		if (!result)
			return NextResponse.json(
				{ error: true, message: 'Failed to update title' },
				{ status: 404 }
			);
		return NextResponse.json(result);
	},
	{
		auth: true,
	}
);

export const DELETE = routeHandler<{ productId: string }>(
	async ({ xata, params: { productId } }) => {
		const result = await new DeleteProductQuery(xata).execute(productId);
		if (!result)
			return NextResponse.json(
				{ error: true, message: 'Failed to delete product' },
				{ status: 404 }
			);
		return NextResponse.json(result);
	},
	{
		auth: true,
	}
);
