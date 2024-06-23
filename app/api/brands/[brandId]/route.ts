import { routeHandler } from '@lib/api/routeHandler';
import { GetBrandQuery } from '@infrastructure/brand/GetBrandQuery';
import { NextResponse } from 'next/server';

export const GET = routeHandler<{ brandId: string }>(
	async ({ xata, params: { brandId } }) => {		
		const product = await new GetBrandQuery(xata).execute(brandId);
		return NextResponse.json(product);
	},
	{
		auth: true,
	}
);
