import { BaseProductAttributes } from '@domain/product';
import { XataQuery } from '@/lib/api/XataQuery';

export interface ListProductsParameters {
	offset?: number;
	limit?: number;
	brand?: string[];
}

export class ListProductsQuery extends XataQuery<BaseProductAttributes[]> {
	public async execute({ offset, limit, brand }: ListProductsParameters) {
		const products = await this.xata.db.product
			.select([
				'id',
				'title',
				'attributes',
				'thumbnail.*',
				'thumbnail.signedUrl',
				'brand.name',
				'brand.attributes',
				'brand.owner.name',
				'brand.logo.signedUrl',
				'author.name',
				'author.email',
				'author.avatar.signedUrl',
			])
			.filter({
				deleted: false,
				...(brand ? { 'brand.id': { $any: brand } } : undefined),
			})
			.sort('xata.updatedAt', 'desc')
			.getMany({
				// pagination: {
				// 	offset,
				// 	size: limit,
				// },
				fetchOptions: { next: { revalidate: 0 } },
			});

		return products.map(
			({ id, title, thumbnail, brand, author, attributes }): BaseProductAttributes => {
				if (!brand || !author) throw new Error();
				return {
					id,
					title,
					attributes,
					thumbnail: {
						src: thumbnail?.signedUrl ?? '',
						width: thumbnail?.attributes?.width,
						height: thumbnail?.attributes?.height,
					},
					brand: {
						id: brand.id,
						name: brand.name!,
						attributes: brand.attributes!,
						owner: {
							id: brand.owner!.id,
							name: brand.owner!.name!,
						},
						logo: {
							src: brand.logo?.signedUrl ?? '',
							width: brand.logo?.attributes?.width,
							height: brand.logo?.attributes?.height,
						},
					},
					author: {
						id: author.id,
						name: author.name!,
						email: author.email!,
						avatar: author.avatar
							? {
									src: author.avatar?.signedUrl ?? '',
									width: author.avatar?.attributes?.width,
									height: author.avatar?.attributes?.height,
							  }
							: undefined,
					},
				};
			}
		);
	}
}
