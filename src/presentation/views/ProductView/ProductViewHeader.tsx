'use client';
import { useProductContext } from '@presentation/views/ProductView/ProductContext';
import Image from 'next/image';

import { Button, Dialog, DialogContent, DialogTrigger } from '@components/ui';
import {
	Cloud,
	CreditCard,
	EllipsisIcon,
	EllipsisVerticalIcon,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	PaintbrushIcon,
	PencilIcon,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	UserRoundCogIcon,
	Users,
	ZoomInIcon,
} from 'lucide-react';
import Link from 'next/link';
import { BrandHoverCard } from './BrandHoverCard';
import { EditTitleDialog } from './ProductCards/EditTitleDialog';
import { DropdownMenu } from '@components/DropdownMenu';

export const ProductViewHeader = () => {
	const { product } = useProductContext();
	return (
		<div className="flex gap-4 p-6">
			<div className="h-full">
				<div className="relative group border rounded-md p-2 overflow-hidden">
					<Dialog>
						<DialogTrigger asChild>
							<div>
								<Image
									className="h-[100px] w-[100px]"
									width={100}
									height={100}
									alt={product.title}
									src={product.thumbnail.src}
								/>
								<div className="flex flex-col absolute w-full h-full top-0 left-0 opacity-0 group-hover:opacity-100 transition-all bg-foreground/20 dark:bg-foreground/40 cursor-zoom-in">
									<div className="flex-1 flex justify-center items-center opacity-90 text-background">
										<ZoomInIcon size={36} />
									</div>
									<div className="mt-auto flex flex-wrap items-end justify-items-end content-end">
										{product.pattern.groups.map((group) => (
											<div
												className="h-2 flex-1"
												key={group.id}
												style={{ backgroundColor: group.hex }}
											/>
										))}
									</div>
								</div>
							</div>
						</DialogTrigger>
						<DialogContent className="p-0 w-auto rounded-none sm:rounded-none border-none">
							<Image
								width={product.thumbnail.width * 10}
								height={product.thumbnail.height * 10}
								alt={product.title}
								src={product.thumbnail.src}
							/>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Title</span>
						<div className="flex gap-2 items-center">
							<h2 className="text-xl font-semibold">{product.title}</h2>
							<EditTitleDialog initialValue={product.title} />
						</div>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Type</span>
						<h2 className="text-sm">{'Cross Stitch Pattern'}</h2>
					</div>
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Author</span>
						<h2 className="text-sm">{product.author?.name}</h2>
					</div>
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Brand</span>
						<BrandHoverCard brand={product.brand}>
							<Link
								className="text-sm"
								href={`/studio/brands/${product.brand.id}`}
							>
								{product.brand?.name}
							</Link>
						</BrandHoverCard>
					</div>
				</div>
			</div>
			<div className="ml-auto">
				<DropdownMenu
					items={[
						{
							type: 'item',
							label: 'Change title',
							disabled: true,
							icon: PencilIcon,
						},
						{
							type: 'item',
							label: 'Edit design',
							href: `/studio/cross-stitch/editor?productId=${product.id}`,
							icon: PaintbrushIcon,
						},
						{
							type: 'separator',
						},
						{
							type: 'item',
							label: 'Transfer ownership',
							disabled: true,
							icon: UserRoundCogIcon,
						},
					]}
				>
					<Button size="icon" variant="ghost" className="w-8 m">
						<EllipsisVerticalIcon size={24} />
					</Button>
				</DropdownMenu>
			</div>
		</div>
	);
};
