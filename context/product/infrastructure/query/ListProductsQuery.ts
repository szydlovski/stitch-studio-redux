import { ProductItemAttributes } from '@/context/product/domain/ProductItem';
import { XataQuery } from '@/lib/XataQuery';

export class ListProductsQuery extends XataQuery<ProductItemAttributes[]> {
	public async execute() {
		const products = await this.xata.db.product
			.select([
				'*',
				'thumbnail.*',
				'thumbnail.signedUrl',
				'brand.name',
				'author.name',
				'author.email',
			])
			.filter({ deleted: false })
			.sort('xata.updatedAt', 'desc')
			.getMany({ fetchOptions: { next: { revalidate: 0 } } });

		return products.map(
			({ id, title, thumbnail, brand, author }): ProductItemAttributes => {
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
		);
	}
}
