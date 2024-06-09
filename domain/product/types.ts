export interface ProductThumbnail {
	src: string;
	width: number;
	height: number;
}

export interface ProductBrand {
	id: string;
	name: string;
}

export interface ProductAuthor {
	id: string;
	name: string;
	email: string;
}

export interface ProductAttributes {
	hoopConfig?: any;
	coverConfig?: any;
	printableConfig?: any;
}
