import { ProductThumbnail, ProductBrand, ProductAuthor } from './types';

export interface ProductItemAttributes {
	id: string;
	title: string;
	thumbnail: ProductThumbnail;
	brand: ProductBrand;
	author: ProductAuthor;
}

export class ProductItem {
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly thumbnail: ProductThumbnail,
		public readonly brand: ProductBrand,
		public readonly author: ProductAuthor
	) {}
	static fromAttributes(attrs: ProductItemAttributes): ProductItem {
		return new ProductItem(
			attrs.id,
			attrs.title,
			attrs.thumbnail,
			attrs.brand,
			attrs.author
		);
	}
}
