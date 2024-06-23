import { UpdateProductAttributesQuery } from '@infrastructure/product/UpdateProductAttributesQuery';
import { routeHandler } from '@lib/api/routeHandler';
import { NextResponse } from 'next/server';

export const PATCH = routeHandler<{ productId: string }>(
	async ({ req, xata, params: { productId } }) => {
		const attributes = await req.json();
		const result = await new UpdateProductAttributesQuery(xata).execute(
			productId,
			attributes
		);
		if (!result)
			return NextResponse.json(
				{ error: true, message: 'Failed to update attributes' },
				{ status: 404 }
			);
		return NextResponse.json(result);
	},
	{
		auth: true,
	}
);
