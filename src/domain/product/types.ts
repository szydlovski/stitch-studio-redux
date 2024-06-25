import { BrandAttributes } from '@domain/brand';
import { StaticImageData } from 'next/image';

export interface ProductBrand {
	id: string;
	name: string;
	attributes: BrandAttributes;
	owner: {
		id: string;
		name: string;
	};
	logo: StaticImageData;
}

export interface ProductAuthor {
	id: string;
	name: string;
	email: string;
	avatar?: StaticImageData;
}

export interface ProductAttributes {
	hoopConfig?: any;
	coverConfig?: any;
	printableConfig?: any;
	etsyPublishedListingPayload?: any;
	dismissedFromBoard?: boolean;
}
