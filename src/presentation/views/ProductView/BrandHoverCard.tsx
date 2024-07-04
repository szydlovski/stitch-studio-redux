'use client';
import { useGetBrand } from '@application/brand';
import { QueryStatusGuard } from '@components/guard';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@components/ui';
import { BrandItem } from '@domain/brand';
import { CalendarDays, UserIcon } from 'lucide-react';
import { ReactNode } from 'react';

export const BrandHoverCardContent = ({ brand }: { brand: BrandItem }) => {
	return (
		<div className="flex justify-between space-x-4">
			<Avatar className="border w-24 h-24">
				<AvatarImage src={brand.logo.src} />
				<AvatarFallback>VC</AvatarFallback>
			</Avatar>
			<div className="space-y-1 flex-1">
				<h4 className="text-sm font-semibold">{brand.name}</h4>
				<div className="flex items-center pt-2">
					<UserIcon className="mr-2 h-4 w-4 opacity-70" />
					<span className="text-xs text-muted-foreground">
						Owned by {brand.owner.name}
					</span>
				</div>
			</div>
		</div>
	);
};

export const BrandHoverCard = ({
	brandId,
	children,
}: {
	brandId: string;
	children: ReactNode;
}) => {
	const { data: brand, status } = useGetBrand(brandId);
	return (
		<HoverCard openDelay={300} closeDelay={0}>
			<HoverCardTrigger asChild>{children}</HoverCardTrigger>
			<HoverCardContent className="w-80">
				{status === 'pending' ? (
					<>Loading...</>
				) : status === 'error' ? (
					<>Error</>
				) : (
					<BrandHoverCardContent brand={brand} />
				)}
			</HoverCardContent>
		</HoverCard>
	);
};

export const GetBrandHoverCard = ({
	brandId,
	children,
}: {
	brandId: string;
	children: JSX.Element;
}) => {
	const { data: brand, status } = useGetBrand(brandId);
	return (
		<HoverCard>
			<HoverCardTrigger asChild>{children}</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<QueryStatusGuard
					status={status}
					props={brand}
					loadingContent={<>Loading...</>}
					errorContent={<>Error</>}
				>
					{(brand) => <BrandHoverCardContent brand={brand} />}
				</QueryStatusGuard>
			</HoverCardContent>
		</HoverCard>
	);
};
