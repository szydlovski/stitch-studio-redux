import { STITCH_FAIRY_CO_RECORD_ID } from '@/brand/StitchFairyCo';
import { XataQuery } from '@/lib/api/XataQuery';

export interface CreateProductQueryResult {
	id: string;
	deleted: boolean;
}

export class CreateProductQuery extends XataQuery<CreateProductQueryResult> {
	public async execute(
		userId: string,
		title: string,
		thumbnail: string,
		data: any,
		// TODO remove hardcoded brand, add brand selection
		brand = STITCH_FAIRY_CO_RECORD_ID
	): Promise<CreateProductQueryResult> {
		const product = await this.xata.db.product.create({
			author: userId,
			brand,
			title: title,
			type: 'cross_stitch',
			thumbnail: {
				mediaType: 'image/png',
				base64Content: thumbnail,
				signedUrlTimeout: 3600,
			},
			data: JSON.parse(data),
		});
		if (!product) throw new Error();
		await this.xata.db.event.create({
			table: 'product',
			type: 'product_created',
			user: userId,
			payload: {
				id: product.id,
				title: product.title,
			},
		});
		return { id: product.id, deleted: product.deleted };
	}
}
