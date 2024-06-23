'use client';
import { AppViews } from '@/app/routes';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Skeleton,
} from '@components/ui';
import { BaseProductObject } from '@domain/product';
import { BrandHoverCard } from '@presentation/views/ProductView/BrandHoverCard';
import { transformImage } from '@xata.io/client';
import {
	CircleUserIcon,
	CopyIcon,
	EllipsisIcon,
	LucideProps,
	SquareArrowOutUpRightIcon,
	TrashIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ProductTileProps {
	product: BaseProductObject;
}

interface DropdownMenuItemConfig {
	icon: FC<LucideProps>;
	label: string;
	href?: string;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

const DropdownMenuItemsFromConfig = ({
	items,
}: {
	items: DropdownMenuItemConfig[];
}) => (
	<>
		{items.map(
			({ label, href, icon: Icon, disabled, onClick, className }, index) => {
				const content = (
					<>
						<Icon size={14} />
						<span>{label}</span>
					</>
				);
				return (
					<DropdownMenuItem
						key={index}
						disabled={disabled}
						asChild={href !== undefined}
						onClick={onClick}
						className={className}
					>
						{href ? <Link href={href}>{content}</Link> : content}
					</DropdownMenuItem>
				);
			}
		)}
	</>
);

const getProductMenuItems = (
	product: BaseProductObject
): DropdownMenuItemConfig[] => [
	{
		icon: SquareArrowOutUpRightIcon,
		label: 'View details',
		href: AppViews.Product(product.id),
	},
	{
		icon: CopyIcon,
		label: 'Duplicate',
		disabled: true,
	},
	{
		icon: TrashIcon,
		label: 'Delete',
		disabled: true,
		className: 'text-red-700',
	},
];

export const ProductDropdownMenuContent = ({ product }: ProductTileProps) => {
	return (
		<DropdownMenuContent className="w-[150px]">
			<DropdownMenuLabel>
				<span className="block w-full whitespace-nowrap overflow-hidden text-ellipsis">
					{product.title}
				</span>
			</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItemsFromConfig items={getProductMenuItems(product)} />
		</DropdownMenuContent>
	);
};

export const ProductTile = ({ product }: ProductTileProps) => {
	const { id, title, author, thumbnail, brand } = product;
	return (
		<Card className="group relative">
			<Link key={id} href={AppViews.Product(id)}>
				<CardContent className="p-0 bg-muted/75 border-b aspect-square">
					<div className="h-full w-full flex justify-center items-center p-2 md:p-4">
						<Image
							src={transformImage(thumbnail.src, { height: 256 })}
							alt={title}
							width={thumbnail.width}
							height={thumbnail.height}
						/>
					</div>
				</CardContent>
				<CardHeader className="x p-2.5 space-y-0">
					<CardTitle className="text-sm">
						<span className="block w-full whitespace-nowrap overflow-hidden text-ellipsis">
							{title}
						</span>
					</CardTitle>
					<div className="flex flex-wrap text-[0.6rem] gap-2">
						<BrandHoverCard brand={brand}>
							<span
								className="rounded-full font-bold flex items-center"
								style={{
									backgroundColor: brand.attributes.color,
									color: brand.attributes.textColor,
								}}
							>
								<Avatar className="h-5 w-5">
									<AvatarImage
										className="h-full"
										src={transformImage(brand.logo.src, { height: 20 })}
									/>
									<AvatarFallback>
										<CircleUserIcon className="h-3 w-3" />
									</AvatarFallback>
								</Avatar>
								<span className="pl-1 pr-2">{brand.name}</span>
							</span>
						</BrandHoverCard>
						<div className="rounded-full bg-muted">
							<div className="flex items-center">
								<Avatar className="h-5 w-5">
									<AvatarImage
										className="h-full"
										src={transformImage(author.avatar!.src, { height: 20 })}
									/>
									<AvatarFallback>
										<CircleUserIcon className="h-3 w-3" />
									</AvatarFallback>
								</Avatar>
								<span className="pl-1 pr-2 font-semibold">{author.name}</span>
							</div>
						</div>
						<span className="rounded-full px-2 inline-block font-bold bg-muted">
							{'Cross Stitch'}
						</span>
					</div>
				</CardHeader>
			</Link>
			<div className="absolute top-0 right-0 p-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="flex py-0.5 px-1 h-auto bg-transparent hover:bg-foreground/10 text-foreground">
							<EllipsisIcon size={16} />
						</Button>
					</DropdownMenuTrigger>
					<ProductDropdownMenuContent product={product} />
				</DropdownMenu>
			</div>
		</Card>
	);
};

export const ProductTileSkeleton = () => (
	<Card>
		<CardContent className="p-0 bg-neutral-100 aspect-square">
			<Skeleton className="h-full w-full  flex justify-center items-center p-4" />
		</CardContent>
		<CardHeader className="p-2">
			<Skeleton className="h-5 w-2/3" />
			<Skeleton className="h-4 w-4/5" />
		</CardHeader>
	</Card>
);
