'use client';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@components/ui';
import { CalendarDays } from 'lucide-react';
import { ReactNode } from 'react';

export const BrandHoverCard = ({
	brand,
	children,
}: {
	brand: string;
	children: ReactNode;
}) => {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>{children}</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex justify-between space-x-4">
					<Avatar>
						<AvatarImage src="https://github.com/vercel.png" />
						<AvatarFallback>VC</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">{brand}</h4>
						<p className="text-sm">
							Your favorite cross stitch patterns. Made with love.
						</p>
						<div className="flex items-center pt-2">
							<CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
							<span className="text-xs text-muted-foreground">
								Joined December 2021
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};
