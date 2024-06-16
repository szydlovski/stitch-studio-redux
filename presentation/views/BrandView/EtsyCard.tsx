'use client';
import { BrandDetails } from '@/domain/brand/BrandDetails';
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/presentation/components/ui';
import { Separator } from '@/presentation/components/ui/separator';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

interface EtsyCardProps {
	brand: BrandDetails;
}

export const EtsyCard = async ({ brand }: EtsyCardProps) => {
	const { id: brandId, name, src, etsy } = brand;
	return (
		<Card>
			<CardHeader className="flex-row gap-4 items-center justify-between">
				<CardTitle>Etsy</CardTitle>
				<Button variant="outline" className="text-red-600 hover:text-red-800">
					Disconnect
				</Button>
			</CardHeader>
			<CardContent>
				{etsy ? (
					<div className="grid grid-cols-[250px_1fr] gap-6">
						<div className="">
							<img
								className="rounded-full border w-[250px]"
								src={etsy.payload.icon_url_fullxfull}
								alt={etsy.payload.title}
							/>
						</div>
						<div>
							<div className="flex gap-4">
								<Button
									size="lg"
									className="text-lg p-0 h-auto"
									variant={'link'}
									asChild
								>
									<a href={etsy.payload.url} target="_blank">
										{etsy.payload.shop_name}
									</a>
								</Button>
								<Badge size="xs" variant="success" className="gap-2">
									<span>Connected</span>
									<CheckCircleIcon size={16} strokeWidth={3} />
								</Badge>
							</div>
							<p>{etsy.payload.title}</p>
							<Separator className="w-[200px] my-4" />
							<p>Reviews: {etsy.payload.review_count}</p>
							<p>Review average: {etsy.payload.review_average}</p>
							<p>Sales: {etsy.payload.transaction_sold_count}</p>
							<p>Active listings: {etsy.payload.listing_active_count}</p>
						</div>
					</div>
				) : (
					<div>
						<div>
							<Badge size="sm" variant="error" className="gap-2">
								<span>Not connected to Etsy</span>
								<XCircleIcon size={16} strokeWidth={3} />
							</Badge>
						</div>
						<Button asChild variant="etsy">
							<a
								href={`/api/commerce/etsy/auth/init?brandId=${brandId}`}
								target="_blank"
							>
								Connect Etsy shop
							</a>
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
