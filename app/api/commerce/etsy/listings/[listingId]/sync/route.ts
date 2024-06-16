import { SyncEtsyListingUseCase } from '@infrastructure/etsy/query/SyncEtsyListingUseCase';
import { routeHandler } from '@/lib/api/routeHandler';
import { NextResponse } from 'next/server';

export const GET = routeHandler<{ listingId: string }>(
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
