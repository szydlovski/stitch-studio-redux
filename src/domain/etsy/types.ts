import { GetListingResponse } from '@infrastructure/etsy/EtsyV3OpenApiClient';

export interface EtsyListingAttributes {
	id: string;
	title: string;
	brand?: {
		id: string;
		name: string;
	};
	product?: {
		id: string;
		title: string;
	};
	data?: GetListingResponse;
}

export class EtsyListing {
	public constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly brand?: {
			id: string;
			name: string;
		},
		public readonly data?: GetListingResponse
	) {}
	static fromAttributes(attributes: EtsyListingAttributes) {
		return new EtsyListing(
			attributes.id,
			attributes.title,
			attributes.brand,
			attributes.data
		);
	}
}
