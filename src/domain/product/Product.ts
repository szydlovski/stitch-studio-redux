import {
	CrossStitchPattern,
	CrossStitchPatternData,
} from '@domain/cross-stitch';
import { StaticImageData } from 'next/image';
import { ProductAttributes, ProductAuthor, ProductBrand } from './types';

export interface BaseProductAttributes {
	readonly id: string;
	readonly title: string;
	readonly thumbnail: StaticImageData;
	readonly brand: ProductBrand;
	readonly author: ProductAuthor;
	readonly attributes: ProductAttributes;
}

export class BaseProductObject implements BaseProductAttributes {
	public readonly id: string;
	public readonly title: string;
	public readonly thumbnail: StaticImageData;
	public readonly brand: ProductBrand;
	public readonly author: ProductAuthor;
	public readonly attributes: ProductAttributes;
	protected constructor(attrs: BaseProductAttributes) {
		this.id = attrs.id;
		this.title = attrs.title;
		this.thumbnail = attrs.thumbnail;
		this.brand = attrs.brand;
		this.author = attrs.author;
		this.attributes = attrs.attributes;
	}
	static fromAttributes(attrs: BaseProductAttributes): BaseProductObject {
		return new BaseProductObject(attrs);
	}
	public get status() {
		const attrs = this.attributes;
		const customizations = [
			attrs.hoopConfig,
			attrs.coverConfig,
			attrs.printableConfig,
		];
		const hasAny = customizations.some((c) => c !== undefined);
		if (!hasAny) return 'new';
		const hasAll = customizations.every((c) => c !== undefined);
		if (!hasAll) return 'in_progress';
		const hasEtsy = attrs.etsyPublishedListingPayload !== undefined;
		if (!hasEtsy) return 'ready';
		return 'published';
	}
}

export interface FullProductAttributes extends BaseProductAttributes {
	data: CrossStitchPatternData;
}

export class FullProductObject
	extends BaseProductObject
	implements FullProductAttributes
{
	public readonly data: CrossStitchPatternData;
	public readonly pattern: CrossStitchPattern;
	protected constructor({ data, ...attrs }: FullProductAttributes) {
		super(attrs);
		this.data = data;
		this.pattern = CrossStitchPattern.fromSerialized(this.data);
	}
	static fromAttributes(attrs: FullProductAttributes): FullProductObject {
		return new FullProductObject(attrs);
	}
}
