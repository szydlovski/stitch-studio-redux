'use client';
import { EtsyListingAttributes } from '@domain/etsy/types';

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@components/ui';
import { useSyncEtsyListing } from './useSyncEtsyListing';

export const NoDataCard = ({ listing }: { listing: EtsyListingAttributes }) => {
	const { data, mutateAsync, status } = useSyncEtsyListing();
	return (
		<Card>
			<CardHeader>
				<CardTitle>{listing.title}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{status === 'success' && data.success ? (
					<p>Listing synced successfully! This page will reload in a moment.</p>
				) : status === 'error' ? (
					<p className="text-red-700">
						An error occured while syncing this listing.
					</p>
				) : (
					<p>This listing has not been synced yet.</p>
				)}
				<div>
					<Button
						onClick={() =>
							mutateAsync(listing.id).then(() => window.location.reload())
						}
						disabled={status !== 'idle'}
					>
						{status === 'pending' ? 'Syncing...' : 'Sync Now'}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
