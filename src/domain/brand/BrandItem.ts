import { StaticImageData } from 'next/image';
import { BrandAttributes, BrandEtsyAccount, BrandOwner } from './types';

export interface BrandItemAttributes {
	readonly id: string;
	readonly name: string;
	readonly owner: BrandOwner;
	readonly logo: StaticImageData;
	readonly etsy?: BrandEtsyAccount;
	readonly attributes: BrandAttributes;
}

export class BrandItem implements BrandItemAttributes {
	public readonly id: string;
	public readonly name: string;
	public readonly owner: BrandOwner;
	public readonly logo: StaticImageData;
	public readonly etsy?: BrandEtsyAccount;
	public readonly attributes: BrandAttributes;
	protected constructor(attrs: BrandItemAttributes) {
		this.id = attrs.id;
		this.name = attrs.name;
		this.owner = attrs.owner;
		this.logo = attrs.logo;
		this.etsy = attrs.etsy;
		this.attributes = attrs.attributes;
	}
	public static fromAttributes(attrs: BrandItemAttributes): BrandItem {
		return new BrandItem(attrs);
	}
}

export interface BrandDetailsAttributes extends BrandItemAttributes {}

export class BrandDetails extends BrandItem {
	protected constructor(attrs: BrandDetailsAttributes) {
		super(attrs);
	}
	public static fromAttributes(attrs: BrandDetailsAttributes): BrandDetails {
		return new BrandDetails(attrs);
	}
}
