import { routeHandler } from '@/lib/api/routeHandler';
import { ListBrandsQuery } from '@infrastructure/brand/ListBrandsQuery';
import { NextResponse } from 'next/server';

export const GET = routeHandler(
	async () => {
		const brands = await new ListBrandsQuery().execute();
		return NextResponse.json(brands);
	},
	{
		auth: true,
	}
);
