import { routeHandler } from '@/lib/routeHandler';
import { NextResponse } from 'next/server';
import { ListProductsQuery } from '@/infrastructure/product/query/ListProductsQuery';
import { CreateProductQuery } from '@/infrastructure/product/query/CreateProductQuery';

export const GET = routeHandler(
	async ({ xata }) => {
		const products = await new ListProductsQuery(xata).execute();
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
