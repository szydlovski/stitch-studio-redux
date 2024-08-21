import { XataQuery } from '@lib/api/XataQuery';
import {ProductImageNotFoundError} from "@infrastructure/product-image/ProductImageNotFoundError";
import {ProductImageTagNotFoundError} from "@infrastructure/product-image/tags/ProductImageTagNotFoundError";

export interface DeleteProductImageCommandResult {
	id: string;
}

export class DeleteProductImageTagCommand extends XataQuery {
	public async execute(id: string, tag: string): Promise<DeleteProductImageCommandResult> {
		const image = await this.xata.db.productImage.select(['*']).filter({ id }).getFirst();
		if (!image) throw new ProductImageNotFoundError();

		if (!image.tags?.includes(tag)) throw new ProductImageTagNotFoundError(id, tag);

		await this.xata.db.productImage.update({ id, tags: image.tags?.filter(t => t !== tag) });

		return { id: image.id };
	}
}
