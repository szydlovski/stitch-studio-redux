import { EtsyListingAttributes } from '@domain/etsy/types';
import { XataQuery } from '@/lib/api/XataQuery';

export class GetEtsyListingQuery extends XataQuery<EtsyListingAttributes> {
	async execute(listingId: string) {
		const listing = await this.xata.db.etsyListing
			.select(['*', 'brand.*', 'product.*'])
			.filter({
				id: listingId,
			})
			.getFirstOrThrow()
			.then(
				(listing): EtsyListingAttributes => ({
					id: listing.id,
					title: listing.title,
					data: listing.data,
					brand: listing.brand
						? {
								id: listing.brand.id,
								name: listing.brand.name!,
						  }
						: undefined,
					product: listing.product
						? {
								id: listing.product.id,
								title: listing.product.title!,
						  }
						: undefined,
				})
			);
		return listing;
	}
}
