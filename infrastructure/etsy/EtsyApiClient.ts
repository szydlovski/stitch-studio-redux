import { EtsyListing } from '@/domain/etsy/types';
import { encode } from 'querystring';

export class EtsyApiClient {
	private async fetch(input: string | URL, init?: RequestInit): Promise<any> {
		const response = await fetch(input, init);
		return response.json();
	}

	public getListing(id: string): Promise<EtsyListing> {
		return this.fetch(`/api/commerce/etsy/listings/${id}`).then(
			EtsyListing.fromAttributes
		);
	}

	public listListingsByBrand(
		brandId: string,
		limit = 10,
		offset = 0
	): Promise<EtsyListing[]> {
		return this.fetch(
			`/api/commerce/etsy/listings?${encode({ brandId, limit, offset })}`
		).then((records) => records.map(EtsyListing.fromAttributes));
	}

	public syncListing(id: string): Promise<any> {
		return this.fetch(`/api/commerce/etsy/listings/${id}/sync`);
	}
}
