import {
	CrossStitchPattern,
	CrossStitchPatternData,
} from '@domain/cross-stitch';
import { ProductAuthor, ProductBrand, ProductThumbnail } from './types';
import { BrandItem } from '@domain/brand';

export interface ProductDetailsAttributes {
	id: string;
	title: string;
	data: CrossStitchPatternData;
	thumbnail: ProductThumbnail;
	brand: ProductBrand;
	author: ProductAuthor;
}

export class ProductDetails {
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly data: CrossStitchPatternData,
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
	get pattern(): CrossStitchPattern {
		return CrossStitchPattern.fromAttributes(this.data);
	}
}
