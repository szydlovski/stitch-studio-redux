import { Pattern, PatternData } from '@/lib/pattern/pattern';
import { ProductAuthor, ProductBrand, ProductThumbnail } from './types';

export interface ProductDetailsAttributes {
	id: string;
	title: string;
	data: PatternData;
	thumbnail: ProductThumbnail;
	brand: ProductBrand;
	author: ProductAuthor;
}

export class ProductDetails {
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly data: PatternData,
		public readonly thumbnail: ProductThumbnail,
		public readonly brand: ProductBrand,
		public readonly author: ProductAuthor
	) {}
	static fromAttributes(attrs: ProductDetailsAttributes): ProductDetails {
		return new ProductDetails(
			attrs.id,
			attrs.title,
			attrs.data,
			attrs.thumbnail,
			attrs.brand,
			attrs.author
		);
	}
	get pattern(): Pattern {
		return Pattern.fromData(this.data);
	}
}
