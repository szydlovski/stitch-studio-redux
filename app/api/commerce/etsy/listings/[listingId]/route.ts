import { GetEtsyListingQuery } from '@infrastructure/etsy/query/GetEtsyListing';
import { routeHandlerFactory } from '@lib/api/routeHandlerFactory';
import { NextResponse } from 'next/server';

export const GET = routeHandlerFactory<{ listingId: string }>(
	async ({ params: { listingId } }) => {
		const listing = await new GetEtsyListingQuery().execute(listingId);
		return NextResponse.json(listing);
	},
	{
		auth: true,
	}
);
