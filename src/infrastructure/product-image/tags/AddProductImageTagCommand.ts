import { XataQuery } from '@lib/api/XataQuery';
import {ProductImageNotFoundError} from "@infrastructure/product-image/ProductImageNotFoundError";
import {ProductImageTagAlreadyExistsError} from "@infrastructure/product-image/tags/ProductImageTagAlreadyExistsError";

export interface DeleteProductImageCommandResult {
	id: string;
}

export class AddProductImageTagCommand extends XataQuery {
	public async execute(id: string, tag: string): Promise<DeleteProductImageCommandResult> {
		const image = await this.xata.db.productImage.select(['*']).filter({ id }).getFirst();
		if (!image) throw new ProductImageNotFoundError();

		if (image.tags?.includes(tag)) throw new ProductImageTagAlreadyExistsError(id, tag);

		await this.xata.db.productImage.update({ id, tags: [...(image.tags || []), tag] });
		return { id: image.id };
	}
}
