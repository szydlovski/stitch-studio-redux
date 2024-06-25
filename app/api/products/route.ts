import { routeHandler } from '@lib/api/routeHandler';
import { NextResponse } from 'next/server';
import { ListProductsQuery } from '@infrastructure/product/ListProductsQuery';
import { CreateProductQuery } from '@infrastructure/product/CreateProductQuery';

export const GET = routeHandler(
	async ({ req, xata }) => {
		const searchParams = new URL(req.url).searchParams;
		const result = await new ListProductsQuery(xata).execute({
			brand: searchParams.getAll('brand'),
			limit: searchParams.get('limit')
				? parseInt(searchParams.get('limit') as string)
				: undefined,
			offset: searchParams.get('offset')
				? parseInt(searchParams.get('offset') as string)
				: undefined,
		});
		return NextResponse.json(result);
	},
	{
		auth: true,
	}
);

export const POST = routeHandler(
	async ({ xata, req, session }) => {
		const body = await req.json();
		const product = await new CreateProductQuery(xata).execute(
			session.identity.id,
			body.title,
			body.thumbnail,
			body.data
		);
		return NextResponse.json(product);
	},
	{
		auth: true,
	}
);
