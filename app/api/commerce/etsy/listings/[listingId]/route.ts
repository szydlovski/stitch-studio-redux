import { GetEtsyListingQuery } from '@infrastructure/etsy/query/GetEtsyListing';
import { routeHandler } from '@lib/api/routeHandler';
import { NextResponse } from 'next/server';

export const GET = routeHandler<{ listingId: string }>(
	async ({ params: { listingId } }) => {
		const listing = await new GetEtsyListingQuery().execute(listingId);
		return NextResponse.json(listing);
	},
	{
		auth: true,
	}
);
