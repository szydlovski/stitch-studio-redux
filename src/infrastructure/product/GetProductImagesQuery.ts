import { ProductImageItemAttributes } from '@domain/product-image';
import { XataQuery } from '@lib/api/XataQuery';

export class GetProductImagesQuery extends XataQuery<
	ProductImageItemAttributes[]
> {
	public async execute(
		productId: string
	): Promise<ProductImageItemAttributes[]> {
		const images = await this.xata.db.productImage
			.select(['*', 'image.*', 'image.signedUrl'])
			.filter({
				product: productId,
			})
			.sort('xata.createdAt', 'desc')
			.getAll()
			.then((images) =>
				images.map(
					({ id, image, attributes, tags }): ProductImageItemAttributes => ({
						id,
						tags: tags ?? [],
						attributes,
						src: image?.signedUrl ?? '',
						width: image?.attributes?.width,
						height: image?.attributes?.height,
					})
				)
			);
		return images;
	}
}
