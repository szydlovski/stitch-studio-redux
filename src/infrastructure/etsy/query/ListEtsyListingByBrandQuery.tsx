import { EtsyListingAttributes } from '@domain/etsy/types';
import { XataQuery } from '@lib/api/XataQuery';

export class ListEtsyListingByBrandQuery extends XataQuery<
	EtsyListingAttributes[]
> {
	async execute(brandId: string, size: number = 25, offset: number = 0) {
		const listings = await this.xata.db.etsyListing
			.select(['*', 'brand.*', 'product.*'])
			.filter({
				brand: brandId,
			})
			.getPaginated({ pagination: { size, offset } })
			.then((result) =>
				result.records.map(
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
				)
			);
		return listings;
	}
}
