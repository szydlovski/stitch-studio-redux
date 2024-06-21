import { BrandAttributes } from '@domain/brand';

export interface ProductThumbnail {
	src: string;
	width: number;
	height: number;
}

export interface ProductBrand {
	id: string;
	name: string;
	attributes: BrandAttributes;
	owner: {
		id: string;
		name: string;
	};
	logo: {
		src: string;
		width: number;
		height: number;
	};
}

export interface ProductAuthor {
	id: string;
	name: string;
	email: string;
	avatar?: {
		src: string;
		width: number;
		height: number;
	};
}

export interface ProductAttributes {
	hoopConfig?: any;
	coverConfig?: any;
	printableConfig?: any;
}
