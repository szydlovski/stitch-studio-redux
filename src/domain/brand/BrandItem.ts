export interface BrandItemAttributes {
	id: string;
	name: string;
	totalProducts: number;
	owner: string;
	logo: string;
	etsy?: {
		id: string;
		payload: any;
	};
}

export class BrandItem {
	private constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly totalProducts: number,
		public readonly owner: string,
		public readonly logo: string,
		public readonly etsy?: { id: string; payload: any }
	) {}
	public static fromAttributes(attributes: BrandItemAttributes): BrandItem {
		return new BrandItem(
			attributes.id,
			attributes.name,
			attributes.totalProducts,
			attributes.owner,
			attributes.logo,
			attributes.etsy
		);
	}
}
