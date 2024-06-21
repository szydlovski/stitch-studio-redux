import { Rating } from '@components/ui';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator,
} from '@components/ui';
import { useBrandViewContext } from '../BrandViewContext';
import Image from 'next/image';

interface EtsyShopPayload {
	icon_url_fullxfull: string;
	shop_name: string;
	title: string;
	url: string;
	review_average: number;
	review_count: number;
	transaction_sold_count: number;
	listing_active_count: number;
}

const EtsyShopSummary = ({ shop }: { shop: EtsyShopPayload }) => {
	return (
		<div>
			<div className="flex gap-2">
				<Button
					size="lg"
					className="text-lg p-0 h-auto"
					variant={'link'}
					asChild
				>
					<a href={shop.url} target="_blank">
						{shop.shop_name}
					</a>
				</Button>
			</div>
			<p className="-mt-1 italic">{shop.title}</p>

			<div className="flex gap-2 items-center">
				<Rating value={shop.review_average} />
				<span className="font-semibold">({shop.review_count})</span>
			</div>
			<Separator className="w-[200px] my-2" />
			<p>Sales: {shop.transaction_sold_count}</p>
			<p>Active listings: {shop.listing_active_count}</p>
		</div>
	);
};

const EtsyAccountCard = () => {
	const {
		brand: { etsy },
	} = useBrandViewContext();
	const account = etsy!;
	return (
		<Card>
			<CardHeader className="flex-row gap-4 items-center justify-between">
				<CardTitle>Etsy</CardTitle>
				{account && (
					<Button variant="outline" className="text-red-600 hover:text-red-800">
						Disconnect
					</Button>
				)}
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-[150px_1fr] gap-6">
					<Image
						className="rounded-full border w-[150px]"
						src={account.payload.icon_url_fullxfull}
						alt={account.payload.title}
						width={150}
						height={150}
					/>
					<EtsyShopSummary shop={account.payload} />
				</div>
			</CardContent>
		</Card>
	);
};

export const EtsyConnectCard = () => {
	const {
		brand: { id: brandId },
	} = useBrandViewContext();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Etsy</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="py-12 text-center">
					<h2 className="text-lg font-semibold">Not configured</h2>
					<div className="text-muted-foreground">
						<p>Etsy integration has not been configured for this brand.</p>
						<p>Use the button below to connect your account.</p>
					</div>
					<Button asChild variant="etsy" className="mt-4">
						<a
							href={`/api/commerce/etsy/auth/init?brandId=${brandId}`}
							target="_blank"
						>
							Connect Etsy shop
						</a>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export const EtsyCard = () => {
	const {
		brand: { etsy: account },
	} = useBrandViewContext();
	return account ? <EtsyAccountCard /> : <EtsyConnectCard />;
};
