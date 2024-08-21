'use client';
import { cn } from '@lib/utils';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger, Input,
	Skeleton,
} from '@components/ui';
import { ProductImageItem } from '@domain/product-image';
import { transformImage } from '@xata.io/client';
import {
	CheckIcon,
	EllipsisIcon,
	Mail,
	MessageSquare,
	PlusCircle,
	UserPlus, XIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {MouseEvent, useCallback, useState} from 'react';
import {useDeleteProductImageTags} from "@application/product-image/deleteProductImageTag";
import {FullProductObject} from "@domain/product";
import {useAddProductImageTags} from "@application/product-image/addProductImageTag";
import {useQueryClient} from "@tanstack/react-query";
import {getProductImagesQueryKey} from "@application/product-image";

const ProductImageMenuContent = ({
	image: { src, tags },
	active,
}: ProductImageTileProps) => {
	return (
		<DropdownMenuContent className="w-[200px]">
			<DropdownMenuItem>
				<Link href={'#'}>{'Test item'}</Link>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<Link href={src} download target="_blank">
					{'Download'}
				</Link>
			</DropdownMenuItem>
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>
					<UserPlus className="mr-2 h-4 w-4" />
					<span>Invite users</span>
				</DropdownMenuSubTrigger>
				<DropdownMenuPortal>
					<DropdownMenuSubContent className="w-[200px]">
						<DropdownMenuItem>
							<Mail className="mr-2 h-4 w-4" />
							<span>Email</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<MessageSquare className="mr-2 h-4 w-4" />
							<span>Message</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<PlusCircle className="mr-2 h-4 w-4" />
							<span>More...</span>
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuPortal>
			</DropdownMenuSub>
		</DropdownMenuContent>
	);
};

const GridCheckbox = ({
	checked,
	onCheckedChange,
}: {
	checked?: boolean;
	defaultChecked?: boolean;
	required?: boolean;
	onCheckedChange?: (
		checked: boolean,
		evt: MouseEvent<HTMLButtonElement>
	) => void;
}) => {
	return (
		<button
			onClick={(evt) => onCheckedChange?.(!checked, evt)}
			className={cn(
				'bg-background w-6 h-6 rounded-md flex justify-center items-center border text-transparent hover:text-foreground/25',
				{
					'border-foreground bg-foreground text-background hover:text-background/80':
						checked,
				}
			)}
		>
			<CheckIcon strokeWidth={4} size={18} />
		</button>
	);
};

const showOnHoverClasses =
	'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all';

interface ProductImageTileProps {
	image: ProductImageItem;
	product: FullProductObject;
	active?: boolean;
	selected?: boolean;
	selectionOngoing?: boolean;
	onSelectedChange?: (
		isSelected: boolean,
		evt: MouseEvent<HTMLButtonElement>
	) => void;
}

export const ProductImageTile = ({
	image,
	product,
	active,
	selected,
	selectionOngoing,
	onSelectedChange,
}: ProductImageTileProps) => {
	const queryClient = useQueryClient();
	const { src, tags, width, height } = image;

	const { status: deleteTagStatus, mutateAsync: mutateDeleteAsync } = useDeleteProductImageTags();
	const { status: addTagStatus, mutateAsync: mutatePutAsync } = useAddProductImageTags();

	const handleDelete = useCallback(async (tag) => {
        await mutateDeleteAsync({ productId: product.id, imageId: image.id, tag: tag});
		await queryClient.invalidateQueries({
			queryKey: getProductImagesQueryKey(product.id),
		});
	}, [queryClient, mutateDeleteAsync, image, product]);

	const handleAddTag = useCallback(async (tag) => {
        await mutatePutAsync({ productId: product.id, imageId: image.id, tag: tag});
		await queryClient.invalidateQueries({
			queryKey: getProductImagesQueryKey(product.id),
		});
	}, [queryClient, mutatePutAsync, image, product]);

	const [tagInput, setTagInput] = useState('');

	return (
		<div className="flex flex-col justify-center border rounded-sm group relative overflow-hidden transition-all bg-background">
			<div className="flex bg-neutral-200 transition-all relative">
				<Image
					className="aspect-etsy object-contain my-auto"
					src={transformImage(src, { height: 350 })}
					width={350 * (width / height)}
					height={350}
					alt=""
				/>
			</div>
			<div
				className={cn(
					'absolute top-0 left-0 w-full h-8 bg-gradient-to-t from-black/0 to-black/30',
					!selectionOngoing && showOnHoverClasses
				)}
			/>
			<ul className="p-2 flex">
				{tags.map((tag) => (
					<li
						className="text-xs font-semibold uppercase bg-orange-600 px-1 py-0.5 rounded-sm text-white flex items-center gap-1"
						key={tag}
					>
						{tag}
						<button className={'p-1'}
								onClick={()=> handleDelete(tag)}
								disabled={deleteTagStatus === 'pending'}>
							<XIcon size={12} />
						</button>
					</li>
				))}
			</ul>
			<Input
				id="new-tag"
				value={tagInput}
				disabled={addTagStatus === 'pending'}
				onChange={(e) => setTagInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleAddTag(tagInput);
						setTagInput('');
					}
				}}
				className="col-span-3"
			/>
			<div
				className={cn(
					'absolute top-0 left-0 p-3 w-full',
					!selected && !selectionOngoing && showOnHoverClasses
				)}
			>
				<GridCheckbox checked={selected} onCheckedChange={onSelectedChange} />
			</div>
			<div className={cn('absolute top-0 right-0 p-2', showOnHoverClasses)}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="flex py-0.5 px-1 h-auto bg-transparent hover:bg-foreground/10 text-foreground">
							<EllipsisIcon size={16} />
						</Button>
					</DropdownMenuTrigger>
					<ProductImageMenuContent image={image} active={active} />
				</DropdownMenu>
			</div>
		</div>
	);
};

export const ProductImageTileSkeleton = () => {
	return (
		<div className="flex flex-col justify-center gap-2 border rounded-md p-2 group relative">
			<div className="grid h-[150px] bg-neutral-100">
				<Skeleton className="h-[150px] w-full bg-foreground/5" />
			</div>
		</div>
	);
};
