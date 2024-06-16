'use client';
import { EtsyListingAttributes } from '@domain/etsy/types';
import { cn } from '@/lib';
import { Button, Card } from '@components/ui';
import { CheckIcon, RefreshCwIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const EtsyListingTile = ({
	listing,
	onSync,
	syncLoading,
	syncSuccess,
	syncDisabled,
}: {
	listing: EtsyListingAttributes;
	onSync?: () => void;
	syncLoading?: boolean;
	syncSuccess?: boolean;
	syncDisabled?: boolean;
}) => {
	const Icon = syncSuccess ? CheckIcon : RefreshCwIcon;
	return (
		<Link key={listing.id} href={`/studio/etsy/listings/${listing.id}`}>
			<Card className="rounded-md overflow-hidden">
				<div className="flex flex-col items-center">
					{listing.data?.listing_id ? (
						<Image
							className="w-full aspect-etsy"
							src={listing.data.images[0].url_570xN}
							width={170}
							height={135}
							alt={listing.title}
						/>
					) : (
						<div className="w-full aspect-etsy bg-muted flex justify-center items-center">
							<Button
								size="icon"
								variant={'outline'}
								className="group rounded-full"
								disabled={syncDisabled}
								onClick={onSync}
							>
								<Icon
									className={cn('group-hover:rotate-90 transition-all', {
										'animate-spin': syncLoading && !syncSuccess,
									})}
									size={16}
								/>
							</Button>
						</div>
					)}
				</div>
				<div className="text-xs text-ellipsis whitespace-nowrap overflow-hidden h-full p-2">
					{listing.title}
				</div>
			</Card>
		</Link>
	);
};
