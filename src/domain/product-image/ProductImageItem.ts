export interface ProductImageItemAttributes {
	id: string;

	src: string;
	width: number;
	height: number;

	tags: string[];
	attributes: any;
}

export class ProductImageItem {
	constructor(
		public readonly id: string,
		public readonly tags: string[],
		public readonly src: string,
		public readonly width: number,
		public readonly height: number,
		public readonly attributes: any
	) {}
	static fromAttributes(
		attributes: ProductImageItemAttributes
	): ProductImageItem {
		return new ProductImageItem(
			attributes.id,
			attributes.tags,
			attributes.src,
			attributes.width,
			attributes.height,
			attributes.attributes
		);
	}
}
