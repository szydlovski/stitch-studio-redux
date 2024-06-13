import { EtsyListingAttributes } from '@/domain/etsy/types';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/presentation/components/ui/breadcrumb';
import { ListingCard } from './components/ListingCard';
import { NoDataCard } from './components/NoDataCard';

export const EtsyListingContent = ({
	listing,
}: {
	listing: EtsyListingAttributes;
}) => {
	return (
		<div className="bg-muted/40 p-6 pb-0 min-h-full flex flex-col gap-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/studio/etsy">Etsy</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/studio/etsy/listings">
							Listings
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem className="flex-1 flex w-1">
						<BreadcrumbPage className="text-ellipsis whitespace-nowrap overflow-hidden">
							{listing.title}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			{listing.data?.listing_id ? (
				<ListingCard listing={listing} data={listing.data} />
			) : (
				<NoDataCard listing={listing} />
			)}
		</div>
	);
};
