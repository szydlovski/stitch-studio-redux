import { XataQuery } from '@/lib/api/XataQuery';
import { ProductDetailsAttributes } from '@domain/product/ProductDetails';

export class GetProductQuery extends XataQuery<ProductDetailsAttributes> {
	public async execute(id: string): Promise<ProductDetailsAttributes> {
		const product = await this.xata.db.product
			.select([
				'*',
				'thumbnail.*',
				'thumbnail.signedUrl',
				'brand.name',
				'author.name',
				'author.email',
			])
			.filter({ id })
			.getFirstOrThrow();
			// .getFirstOrThrow({ fetchOptions: { next: { revalidate: 0 } } });
		const { title, thumbnail, brand, author, data } = product;
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
	}
}
