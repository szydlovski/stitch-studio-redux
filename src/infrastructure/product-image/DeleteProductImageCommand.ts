import { XataQuery } from '@lib/api/XataQuery';
import {ProductImageNotFoundError} from "@infrastructure/product-image/ProductImageNotFoundError";

export interface DeleteProductImageCommandResult {
	id: string;
}

export class DeleteProductImageCommand extends XataQuery {
	public async execute(id: string): Promise<DeleteProductImageCommandResult> {
		const image = await this.xata.db.productImage.delete({ id});
		if (!image) throw new ProductImageNotFoundError();
		return { id: image.id };
	}
}
