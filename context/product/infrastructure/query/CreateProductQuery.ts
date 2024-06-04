import { XataQuery } from '@/lib/XataQuery';

export interface CreateProductQueryResult {
	id: string;
	deleted: boolean;
}

export class CreateProductQuery extends XataQuery<CreateProductQueryResult> {
	public async execute(userId: string, title: string, thumbnail: string, data: any): Promise<CreateProductQueryResult> {
		const product = await this.xata.db.product.create({
			author: userId,
			// TODO remove hardcoded brand, add brand selection
			brand: 'rec_cpc4clmotdb9928vhhog',
			title: title,
			thumbnail: {
				mediaType: 'image/png',
				base64Content: thumbnail,
				signedUrlTimeout: 3600,
			},
			data: JSON.parse(data),
		});
		if (!product) throw new Error();
		return { id: product.id, deleted: product.deleted };
	}
}
