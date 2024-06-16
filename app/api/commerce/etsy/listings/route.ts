import { GetEtsyListingQuery } from '@infrastructure/etsy/query/GetEtsyListing';
import { ListEtsyListingByBrandQuery } from '@infrastructure/etsy/query/ListEtsyListingByBrandQuery';
import { routeHandler } from '@/lib/api/routeHandler';
import { NextResponse } from 'next/server';

export const GET = routeHandler<{ listingId: string }>(
	async ({ req }) => {
		const { brandId, limit, offset } = Object.fromEntries(
			new URL(req.url).searchParams.entries()
		);
		const listings = await new ListEtsyListingByBrandQuery().execute(
			brandId,
			limit ? Number(limit) : undefined,
			offset ? Number(offset) : undefined
		);
		return NextResponse.json(listings);
	},
	{
		auth: true,
	}
);
