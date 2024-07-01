import { XataQuery } from "@lib/api/XataQuery";

interface CreateProductImageCommandArgs {
	imageBase64: string;
	type?: 'png' | 'jpeg';
	tags?: string[];
}

class CreateProductImageCommand extends XataQuery {
	async execute(
		productId: string,
		{ imageBase64, type = 'png', tags = [] }: CreateProductImageCommandArgs
	) {
		const result = await this.xata.db.productImage.create({
			product: productId,
			tags,
			image: {
				mediaType: `image/${type}`,
				base64Content: imageBase64,
				signedUrlTimeout: 3600,
			},
		});
		return result.toSerializable();
	}
}