import { routeHandlerFactory } from '@lib/api/routeHandlerFactory';
import { ListBrandsQuery } from '@infrastructure/brand/ListBrandsQuery';
import { NextResponse } from 'next/server';

export const GET = routeHandlerFactory(
	async () => {
		const brands = await new ListBrandsQuery().execute();
		return NextResponse.json(brands);
	},
	{
		auth: true,
	}
);
