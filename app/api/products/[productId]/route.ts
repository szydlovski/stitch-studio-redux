import { deleteProduct } from '@/actions/deleteProduct';
import { updateTitle } from '@/actions/updateTitle';
import { PatternData } from '@/lib/pattern/pattern';
import { getXataClient } from '@/lib/xata';
import { NextRequest } from 'next/server';

export interface ProductDetails {
	id: string;
	title: string;
	data: PatternData;
	thumbnail: {
		src: string;
		width: number;
		height: number;
	};
	brand: {
		id: string;
		name: string;
	};
	author: {
		id: string;
		name: string;
		email: string;
	};
}

const getProduct = (id: string) =>
	getXataClient()
		.db.product.select([
			'*',
			'thumbnail.*',
			'thumbnail.signedUrl',
			'brand.name',
			'author.name',
			'author.email',
		])
		.filter({ id })
		.getFirstOrThrow({ fetchOptions: { next: { revalidate: 0 } } })
		.then(({ id, title, thumbnail, brand, author, data }): ProductDetails => {
			if (!brand || !author) throw new Error();
			return {
				id,
				title,
				data,
				thumbnail: {
					src: thumbnail?.signedUrl ?? '',
					width: thumbnail?.attributes?.width,
					height: thumbnail?.attributes?.height,
				},
				brand: {
					id: brand.id,
					name: brand.name!,
				},
				author: {
					id: author.id,
					name: author.name!,
					email: author.email!,
				},
			};
		});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(
	req: NextRequest,
	{ params: { productId } }: { params: { productId: string } }
) {

	const product = await getProduct(productId);
	return Response.json(product);
}

export async function PATCH(
	req: NextRequest,
	{ params: { productId } }: { params: { productId: string } }
) {
	const parsedBody = await req.json();
	const result = await updateTitle(productId, parsedBody.title);
	if (!result)
		return Response.json(
			{ error: true, message: 'Failed to update title' },
			{ status: 404 }
		);
	const { id, title } = result;
	return Response.json({ id, title });
}

export async function DELETE(
	req: NextRequest,
	{ params: { productId } }: { params: { productId: string } }
) {
	const result = await deleteProduct(productId);
	if (!result)
		return Response.json(
			{ error: true, message: 'Failed to delete product' },
			{ status: 404 }
		);
	const { id, title } = result;
	return Response.json({ id, title });
}
