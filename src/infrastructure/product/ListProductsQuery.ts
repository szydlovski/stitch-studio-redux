import { BaseProductAttributes } from '@domain/product';
import { XataQuery } from '@lib/api/XataQuery';
import { z } from 'zod';

export interface ListProductsParameters {
	offset?: number;
	limit?: number;
	brand?: string[];
}

const ListProductsParametersSchema = z.object({
	offset: z.number().optional(),
	limit: z.number().optional(),
	brand: z.array(z.string()).optional(),
});
export interface ListProductsResult {
	products: BaseProductAttributes[];
	total: number;
}

export class ListProductsQuery extends XataQuery<ListProductsResult> {
	public async execute({
		offset = 0,
		limit = 10,
		brand,
	}: ListProductsParameters) {
		const filter = {
			deleted: false,
			...(brand?.length ? { 'brand.id': { $any: brand } } : undefined),
		};
		const {
			aggs: { total },
		} = await this.xata.db.product.aggregate(
			{ total: { count: { filter } } },
			filter
		);

		const results = await this.xata.db.product
			.select([
				'id',
				'title',
				'attributes',
				'thumbnail.attributes',
				'thumbnail.signedUrl',
				'brand.name',
				'brand.attributes',
				'brand.owner.name',
				'brand.logo.attributes',
				'brand.logo.signedUrl',
				'author.name',
				'author.email',
				'author.avatar.attributes',
				'author.avatar.signedUrl',
			])
			.filter(filter)
			.sort('xata.updatedAt', 'desc')
			.getPaginated({
				pagination: {
					offset,
					size: limit,
				},
				fetchOptions: { next: { revalidate: 0 } },
			});

		return {
			total,
			products: results.records.map(
				({
					id,
					title,
					thumbnail,
					brand,
					author,
					attributes,
				}): BaseProductAttributes => {
					if (!brand || !author) throw new Error();
					return {
						id,
						title,
						attributes,
						thumbnail: XataQuery.fileToStaticImage(thumbnail!),
						brand: {
							id: brand.id,
							name: brand.name!,
							attributes: brand.attributes!,
							logo: XataQuery.fileToStaticImage(brand.logo!),
							owner: {
								id: brand.owner!.id,
								name: brand.owner!.name!,
							},
						},
						author: {
							id: author.id,
							name: author.name!,
							email: author.email!,
							avatar: author.avatar
								? XataQuery.fileToStaticImage(author.avatar)
								: undefined,
						},
					};
				}
			),
		};
	}
}
