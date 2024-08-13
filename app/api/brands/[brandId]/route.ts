import { routeHandlerFactory } from '@lib/api/routeHandlerFactory';
import { GetBrandQuery } from '@infrastructure/brand/GetBrandQuery';
import { NextResponse } from 'next/server';

export const GET = routeHandlerFactory<{ brandId: string }>(
	async ({ xata, params: { brandId } }) => {		
		const product = await new GetBrandQuery(xata).execute(brandId);
		return NextResponse.json(product);
	},
	{
		auth: true,
	}
);
