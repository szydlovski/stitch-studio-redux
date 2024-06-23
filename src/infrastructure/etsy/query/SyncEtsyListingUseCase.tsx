import { EtsyV3OpenApiClient } from '@infrastructure/etsy/EtsyV3OpenApiClient';
import { XataQuery } from '@lib/api/XataQuery';

export class SyncEtsyListingUseCase extends XataQuery {
	async execute(listingId: number) {
		const listingIdStr = listingId.toString();
		const client = new EtsyV3OpenApiClient(process.env.ETSY_API_KEY!);
		const data = await client.getListing(listingIdStr, {
			includes: ['Images'],
		});
		await this.xata.db.etsyListing.createOrUpdate({
			id: listingIdStr,
			title: data.title,
			data: JSON.stringify(data),
		});
		return { success: true };
	}
}
