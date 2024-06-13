import { EtsyListingAttributes } from '@/domain/etsy/types';
import { EtsyListingContent } from './EtsyListingContent';

export const EtsyListingView = ({
	listing,
}: {
	listing: EtsyListingAttributes;
}) => {
	return <EtsyListingContent listing={listing} />;
};
