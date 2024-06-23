import { XataQuery } from '@lib/api/XataQuery';

export interface DeleteProductQueryResult {
	id: string;
	deleted: boolean;
}

export class DeleteProductQuery extends XataQuery<DeleteProductQueryResult> {
	public async execute(id: string): Promise<DeleteProductQueryResult> {
		const product = await this.xata.db.product.update({ id, deleted: true });
		if (!product) throw new Error();
		return { id: product.id, deleted: product.deleted };
	}
}
