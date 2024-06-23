import { routeHandler } from '@lib/api/routeHandler';
import { NextResponse } from 'next/server';
import { ListProductsQuery } from '@infrastructure/product/ListProductsQuery';
import { CreateProductQuery } from '@infrastructure/product/CreateProductQuery';

export const GET = routeHandler(
	async ({ req, xata }) => {
		const searchParams = new URL(req.url).searchParams;
		const products = await new ListProductsQuery(xata).execute({
			brand: searchParams.getAll('brand'),
		});
		return NextResponse.json({ products });
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
