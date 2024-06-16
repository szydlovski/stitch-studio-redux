'use client';
import { EtsyListingAttributes } from '@/domain/etsy/types';
import { Button } from '@/presentation/components/ui';
import {
	View,
	ViewActions,
	ViewBreadcrumbs,
	ViewContent,
	ViewHeader,
	ViewTitle,
} from '@/presentation/components/ui/view';
import { RefreshCwIcon } from 'lucide-react';
import { useSyncEtsyListing } from '../EtsyListingView/components/useSyncEtsyListing';
import { EtsyListingTile } from './components/EtsyListingTile';

export const EtsyListingsDirectoryView = ({
	listings,
}: {
	listings: EtsyListingAttributes[];
}) => {
	const { data, mutateAsync, status } = useSyncEtsyListing();
	return (
		<View className="bg-muted/40">
			<ViewBreadcrumbs
				items={[{ label: 'Etsy', href: '/studio/etsy' }]}
				page={'Listings'}
			/>
			<ViewHeader>
				<ViewTitle>{'Etsy Listings'}</ViewTitle>
				<ViewActions>
					<Button>
						<RefreshCwIcon size={16} />
						Sync listings
					</Button>
				</ViewActions>
			</ViewHeader>
			<ViewContent className="bg-muted">
				<div className="p-6">
					<div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
						{listings.map((listing) => (
							<EtsyListingTile
								key={listing.id}
								listing={listing}
								syncDisabled={status !== 'idle'}
								syncSuccess={status === 'success' && data?.success}
								syncLoading={status === 'pending'}
								onSync={async () => {
									await mutateAsync(listing.id);
									window.location.reload();
								}}
							/>
						))}
					</div>
				</div>
			</ViewContent>
		</View>
	);
};
