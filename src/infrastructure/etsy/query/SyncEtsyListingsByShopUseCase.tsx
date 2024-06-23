import { EtsyV3OpenApiClient } from '@infrastructure/etsy/EtsyV3OpenApiClient';
import { XataQuery } from '@lib/api/XataQuery';

export class SyncEtsyListingsByShopUseCase extends XataQuery {
	async execute(shopId: number, brandId: string) {
		const client = new EtsyV3OpenApiClient(process.env.ETSY_API_KEY!);
		const firstResult = await client.findAllActiveListingsByShop(shopId, {
			limit: 100,
		});
		const pages = Math.ceil(firstResult.count / 100) - 1;
		const results = await Promise.all(
			Array(pages)
				.fill(0)
				.map((_, i) =>
					client.findAllActiveListingsByShop(shopId, {
						offset: (i + 1) * 100,
						limit: 100,
					})
				)
		);
		const allListings = [firstResult, ...results].flatMap((r) => r.results);
		const result = await this.xata.db.etsyListing.createOrUpdate(
			allListings.map((listing) => ({
				id: `${listing.listing_id}`,
				title: listing.title,
				brand: brandId,
			}))
		);
		return { success: true, data: result };
	}
}
