import { getXataClient } from '@/lib/xata';

export interface ListProductsRecord {
	id: string;
	title: string;
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

const listProducts = () =>
	getXataClient()
		.db.product.select([
			'*',
			'thumbnail.*',
			'thumbnail.signedUrl',
			'brand.name',
			'author.name',
			'author.email',
		])
		.filter({ deleted: false })
		.sort('xata.updatedAt', 'desc')
		.getMany({ fetchOptions: { next: { revalidate: 0 } } })
		.then((products) =>
			products.map(
				({ id, title, thumbnail, brand, author }): ListProductsRecord => {
					if (!brand || !author) throw new Error();
					return {
						id,
						title,
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
				}
			)
		);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
	const products = await listProducts();
	await sleep(1000);
	return Response.json(products);
}
