import { EtsyApiClient } from '@infrastructure/etsy/EtsyApiClient';
import { useMutation } from '@tanstack/react-query';

export const useSyncEtsyListing = () =>
	useMutation({
		mutationKey: ['syncEtsyListing'],
		mutationFn: (listingId: string): Promise<{ success: boolean }> =>
			new EtsyApiClient().syncListing(listingId),
	});
