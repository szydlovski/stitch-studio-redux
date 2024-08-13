import { ListEtsyListingByBrandQuery } from '@infrastructure/etsy/query/ListEtsyListingByBrandQuery';
import { routeHandlerFactory } from '@lib/api/routeHandlerFactory';
import { NextResponse } from 'next/server';

export const GET = routeHandlerFactory<{ listingId: string }>(
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
