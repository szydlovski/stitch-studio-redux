import {
	SITCHFAIRYCO_ETSY_SHOP_ID,
	STITCH_FAIRY_CO_RECORD_ID,
} from '@/brand/StitchFairyCo';
import {
	EtsyApiClient,
	GetListingResponse,
} from '@/infrastructure/etsy/EtsyApiClient';
import { XataQuery } from '@/lib/XataQuery';
import { getXataClient } from '@/lib/xata';
import { DashboardViewLayout } from '@/presentation/components/DashboardViewLayout';
import { Card } from '@/presentation/components/ui';
import { DashboardLayout } from '@/presentation/layout';
import Image from 'next/image';

interface EtsyListingAttributes {
	id: string;
	title: string;
	brand?: {
		id: string;
		name: string;
	};
	data?: GetListingResponse;
}

export class ListEtsyListingByBrandQuery extends XataQuery<
	EtsyListingAttributes[]
> {
	async execute(brandId: string, size: number = 25, offset: number = 0) {
		const listings = await this.xata.db.etsyListing
			.select(['*', 'brand.*'])
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
					})
				)
			);
		return listings;
	}
}

export class SyncEtsyListingUseCase extends XataQuery {
	async execute(listingId: number) {
		const listingIdStr = listingId.toString();
		const client = new EtsyApiClient(process.env.ETSY_API_KEY!);
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

export class SyncEtsyListingsByShopUseCase extends XataQuery {
	async execute(shopId: number, brandId: string) {
		const client = new EtsyApiClient(process.env.ETSY_API_KEY!);
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

export default async function EtsyPage() {
	const client = new EtsyApiClient(process.env.ETSY_API_KEY!);
	// const data = await client.getListing('942439189', { includes: ['Images'] });
	// const data = await client.findAllActiveListingsByShop(SITCHFAIRYCO_SHOP_ID, {
	// 	limit: 100,
	// 	offset: 200,
	// });
	// const xata = getXataClient();
	// const fullData = await client.getListing('1029506681', {
	// 	includes: ['Images'],
	// });
	// console.log(fullData.title);

	// const result = await xata.db.etsyListing.createOrUpdate({
	// 	id: '1029506681',
	// 	title: fullData.title,
	// 	data: JSON.stringify(fullData),
	// });
	// const result = await new SyncEtsyListingsByShopUseCase().execute(
	// 	SITCHFAIRYCO_ETSY_SHOP_ID,
	// 	STITCH_FAIRY_CO_RECORD_ID
	// );
	// const result = await new SyncEtsyListingUseCase().execute(1029506681);
	const listings = await new ListEtsyListingByBrandQuery().execute(
		STITCH_FAIRY_CO_RECORD_ID,
		9,
		0
	);

	console.log(listings);

	// const result = await xata.db.etsyListing.select(['*']).getAll();
	return (
		<DashboardLayout>
			<DashboardViewLayout title="Etsy">
				{/* <pre>{JSON.stringify(result, null, 4)}</pre> */}
				<div className="gap-4 grid grid-cols-3">
					{listings.map((listing) => (
						<Card key={listing.id} className="rounded-md overflow-hidden">
							<div className="flex flex-col items-center">
								{listing.data?.listing_id ? (
									<Image
										className="w-full aspect-etsy"
										src={listing.data.images[0].url_570xN}
										width={170}
										height={135}
										alt={listing.title}
									/>
								) : (
									<div className="w-full aspect-etsy bg-blue-600"></div>
								)}
							</div>
							<div className="text-xs text-ellipsis whitespace-nowrap overflow-hidden h-full p-2">
								{listing.title}
							</div>
						</Card>
					))}
				</div>
			</DashboardViewLayout>
		</DashboardLayout>
	);
}
