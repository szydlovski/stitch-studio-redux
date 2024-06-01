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

export const getProduct = (id: string) =>
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
  console.log('get product', productId);
  
	const product = await getProduct(productId);
	return Response.json(product);
}
