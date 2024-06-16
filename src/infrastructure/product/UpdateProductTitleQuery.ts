import { XataQuery } from '@/lib/api/XataQuery';

export interface UpdateProductTitleQueryResult {
	id: string;
	title: string;
}

export class UpdateProductTitleQuery extends XataQuery<UpdateProductTitleQueryResult> {
	public async execute(id: string, title: string): Promise<UpdateProductTitleQueryResult> {
		const product = await this.xata.db.product.update({ id, title });
		if (!product) throw new Error();
		return { id: product.id, title: product.title };
	}
}
