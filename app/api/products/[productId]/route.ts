import { DeleteProductCommand } from '@infrastructure/product/DeleteProductCommand';
import { GetProductQuery } from '@infrastructure/product/GetProductQuery';
import { UpdateProductTitleQuery } from '@infrastructure/product/UpdateProductTitleQuery';
import { routeHandlerFactory } from '@lib/api/routeHandlerFactory';
import { NextResponse } from 'next/server';

export const GET = routeHandlerFactory<{ productId: string }>(
	async ({ xata, params: { productId } }) => {
		const product = await new GetProductQuery(xata).execute(productId);
		return NextResponse.json(product);
	},
	{
		auth: true,
	}
);

export const PATCH = routeHandlerFactory<{ productId: string }>(
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

export const DELETE = routeHandlerFactory<{ productId: string }>(
	async ({ xata, params: { productId } }) => {
		const result = await new DeleteProductCommand(xata).execute(productId);
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
