export interface BrandDetailsAttributes {
	id: string;
	name: string;
	src: string;
	etsy:
		| {
				id: string;
				payload: any;
		  }
		| undefined;
}

export class BrandDetails {
	private constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly src: string,
		public readonly etsy:
			| {
					id: string;
					payload: any;
			  }
			| undefined
	) {}
	public static fromAttributes(attrs: BrandDetailsAttributes): BrandDetails {
		return new BrandDetails(attrs.id, attrs.name, attrs.src, attrs.etsy);
	}
}
