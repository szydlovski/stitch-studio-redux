import { ProductAttributes } from '@domain/product/types';
import { XataQuery } from '@lib/api/XataQuery';


export interface UpdateProductAttributesQueryResult {
	id: string;
	attributes: ProductAttributes;
}

export class UpdateProductAttributesQuery extends XataQuery<UpdateProductAttributesQueryResult> {
	public async execute(
		id: string,
		attributes: ProductAttributes
	): Promise<UpdateProductAttributesQueryResult> {
		const product = await this.xata.db.product.update({ id, attributes });
		if (!product) throw new Error();
		return { id: product.id, attributes: product.attributes };
	}
}
