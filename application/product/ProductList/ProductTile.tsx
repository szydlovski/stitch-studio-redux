'use client';
import {
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
} from '@/presentation/components/ui';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { ProductItem } from '@/domain/product/ProductItem';
import Image from 'next/image';
import Link from 'next/link';
import { transformImage } from '@xata.io/client';
import {
	CopyIcon,
	EllipsisIcon,
	LucideProps,
	SquareArrowOutUpRightIcon,
	TrashIcon,
} from 'lucide-react';
import { FC } from 'react';

interface ProductTileProps {
	product: ProductItem;
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
	product: ProductItem
): DropdownMenuItemConfig[] => [
	{
		icon: SquareArrowOutUpRightIcon,
		label: 'View details',
		href: `/studio/products/${product.id}`,
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
	const { id, title, author, thumbnail } = product;
	return (
		<Card className="group relative">
			<Link key={id} href={`/studio/products/${id}`}>
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
					<CardDescription className="text-xs">
						Author: {author.name}
					</CardDescription>
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
