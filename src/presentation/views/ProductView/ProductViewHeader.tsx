'use client';
import { useProductViewContext } from '@presentation/views/ProductView/ProductViewContext';
import Image from 'next/image';

import { AppViews } from '@/app/routes';
import { DropdownMenu } from '@components/DropdownMenu';
import { Button, Dialog, DialogContent, DialogTrigger } from '@components/ui';
import { useCustomSearchItems } from '@presentation/features/search/SearchContext';
import {
	CopyIcon,
	EllipsisVerticalIcon,
	FileTextIcon,
	PaintbrushIcon,
	PencilIcon,
	PrinterIcon,
	Settings2Icon,
	SettingsIcon,
	Trash2Icon,
	TrashIcon,
	UploadIcon,
	UserRoundCogIcon,
	WandSparklesIcon,
	ZoomInIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { BrandHoverCard } from './BrandHoverCard';
import { LegacyChangeProductTitleDialog } from './cards/ChangeProductTitleDialog';
import { cn } from '@lib/utils';

export const ProductViewHeader = () => {
	const { product } = useProductViewContext();
	const items = useMemo(
		() => [
			{
				id: 'change-product-title',
				label: 'Change title',
				icon: PencilIcon,
			},
		],
		[]
	);
	useCustomSearchItems(items);
	return (
		<div className={cn('flex gap-md')}>
			<div className="h-full">
				<div className="relative group border rounded-md p-2 overflow-hidden">
					<Dialog>
						<DialogTrigger asChild>
							<div>
								<Image
									className="h-32 w-32 object-contain"
									alt={product.title}
									src={product.thumbnail}
								/>
								<div className="flex flex-col absolute w-full h-full top-0 left-0 opacity-0 group-hover:opacity-100 transition-all bg-foreground/20 dark:bg-foreground/40 cursor-zoom-in">
									<div className="flex-1 flex justify-center items-center opacity-90 text-background">
										<ZoomInIcon size={36} />
									</div>
									<div className="mt-auto flex flex-wrap items-end justify-items-end content-end">
										{product.pattern.colors.map(({ id, color }) => (
											<div
												className="h-2 flex-1"
												key={id}
												style={{ backgroundColor: color }}
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
			<div className={cn('flex flex-col gap-md')}>
				<div className="flex gap-4">
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Title</span>
						<div className="flex gap-2 items-center">
							<h2 className="text-xl font-semibold">{product.title}</h2>
							<LegacyChangeProductTitleDialog initialValue={product.title} />
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
						<BrandHoverCard brandId={product.brand.id}>
							<Link
								className="text-sm"
								href={AppViews.Brand(product.brand?.id)}
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
							icon: PencilIcon,
						},
						{
							type: 'item',
							label: 'Transfer',
							icon: UserRoundCogIcon,
						},
						{
							type: 'item',
							label: 'Duplicate',
							icon: CopyIcon,
						},
						{
							type: 'label',
							label: 'Cross Stitch',
						},
						{
							type: 'item',
							label: 'Edit stitches',
							href: `/studio/cross-stitch/editor?productId=${product.id}`,
							icon: PaintbrushIcon,
						},
						{
							type: 'item',
							label: 'Edit mockup settings',
							icon: Settings2Icon,
						},
						{
							type: 'item',
							label: 'Preview printable',
							href: `/api/cross-stitch/pdf-preview?productId=${product.id}`,
							target: '_blank',
							icon: PrinterIcon,
						},
						{
							type: 'label',
							label: 'Covers',
						},
						{
							type: 'item',
							label: 'Generate covers',
							icon: WandSparklesIcon,
						},
						{
							type: 'item',
							label: 'Upload covers',
							icon: UploadIcon,
						},
						{
							type: 'label',
							label: 'Files',
						},
						{
							type: 'item',
							label: 'Generate PDF',
							icon: PrinterIcon,
						},
						{
							type: 'item',
							label: 'Upload files',
							icon: UploadIcon,
						},
						{
							type: 'label',
							label: 'Danger Zone',
						},
						{
							type: 'item',
							label: 'Delete',
							isDangerous: true,
							icon: Trash2Icon,
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
