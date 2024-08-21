import { SyncEtsyListingUseCase } from '@infrastructure/etsy/query/SyncEtsyListingUseCase';
import { routeHandlerFactory } from '@lib/api/routeHandlerFactory';
import { NextResponse } from 'next/server';

export const GET = routeHandlerFactory<{ listingId: string }>(
	async ({ params: { listingId } }) => {
		const result = await new SyncEtsyListingUseCase().execute(
			Number(listingId)
		);
		return NextResponse.json(result);
	},
	{
		auth: true,
	}
);
