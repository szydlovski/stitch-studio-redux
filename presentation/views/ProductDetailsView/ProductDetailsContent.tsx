'use client';
import { DangerZoneCard } from '@/application/product/ProductCards/DangerZoneCard';
import { ImagesTabContent } from '../ProductImages/ImagesTabContent';
import { PatternCard } from '@/application/product/ProductCards/PatternCard';
import { PdfCard } from '@/application/product/ProductCards/PdfCard';
import { StitchFairyCoPdf } from '@/brand/StitchFairyCo/pdf/StitchFairyCoPdf';
import { useProductContext } from '@/presentation/components/context/ProductContext';
import {
	View,
	ViewBreadcrumbs,
	ViewContent,
} from '@/presentation/components/ui/view';
import Image from 'next/image';
import { Button, Card, CardHeader, CardTitle } from '../../components/ui';
import { ScrollArea } from '../../components/ui/scroll-area';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/tabs';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { Loader } from '@/presentation/components/Spinner';
import { CalendarDays } from 'lucide-react';

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/presentation/components/ui/avatar';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/presentation/components/ui/hover-card';
import { ReactNode } from 'react';
import Link from 'next/link';

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

export const ProductViewHeader = () => {
	const { product } = useProductContext();
	return (
		<div className="flex gap-4 p-6">
			<div className="h-full">
				<div className="relative group border rounded-md p-2 overflow-hidden">
					<Image
						className="h-[100px] w-[100px]"
						width={100}
						height={100}
						alt={product.title}
						src={product.thumbnail.src}
					/>
					<div className="absolute w-full h-full top-0 left-0 flex flex-wrap items-end justify-items-end content-end opacity-0 group-hover:opacity-100 transition-all">
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
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<div className="flex flex-col gap-0">
						<span className="text-xs text-muted-foreground">Title</span>
						<h2 className="text-xl font-semibold">{product.title}</h2>
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
						<BrandHoverCard brand={product.brand.name}>
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
		</div>
	);
};

export const ProductViewContent = () => {
	const { product } = useProductContext();
	return (
		<Tabs asChild defaultValue="properties">
			<View>
				<ViewBreadcrumbs
					items={[{ label: 'Products', href: '/studio/products' }]}
					page={product.title}
				/>
				<div className="flex flex-col border-b bg-muted/40">
					<ProductViewHeader />
					<div className="flex">
						<TabsList className="rounded-none w-full px-6 gap-4 justify-start">
							<TabsTrigger value="properties">Product</TabsTrigger>
							<TabsTrigger value="images">Images</TabsTrigger>
							<TabsTrigger value="files">Files</TabsTrigger>
							<TabsTrigger value="cross-stitch">Cross Stitch</TabsTrigger>
							<TabsTrigger value="advanced">Advanced</TabsTrigger>
							<TabsTrigger value="printable">Printable</TabsTrigger>
						</TabsList>
					</div>
				</div>
				<TabsContent asChild value="properties">
					<ViewContent>
						<div className="flex flex-col gap-4 p-6">
							<PatternCard />
						</div>
					</ViewContent>
				</TabsContent>

				<TabsContent asChild value="images">
					<ImagesTabContent />
				</TabsContent>

				<TabsContent asChild value="files">
					<ViewContent>
						<div className="flex flex-col gap-4 p-6">
							<PdfCard />
						</div>
					</ViewContent>
				</TabsContent>

				<TabsContent asChild value="advanced">
					<ViewContent>
						<div className="flex flex-col gap-4 p-6">
							<DangerZoneCard />
						</div>
					</ViewContent>
				</TabsContent>

				<TabsContent asChild value="cross-stitch">
					<ViewContent>
						<div className="flex flex-col gap-4 p-6">
							<PdfCard />
							<Card>
								<CardHeader>
									<CardTitle className="flex gap-2">
										<span>PDF Settings</span>
										<Button className="ml-auto">Generate PDF</Button>
									</CardTitle>
								</CardHeader>
							</Card>
						</div>
					</ViewContent>
				</TabsContent>

				<TabsContent asChild value="printable">
					<ViewContent fullWidth className='bg-muted'>
						<div className="flex flex-col gap-12 px-6 py-12 items-center">
							<StitchFairyCoPdf product={product} />
						</div>
					</ViewContent>
				</TabsContent>
			</View>
		</Tabs>
	);
};

export const ProductViewContentSkeleton = () => {
	return (
		<Tabs asChild defaultValue="properties">
			<View>
				<ViewBreadcrumbs
					items={[{ label: 'Products', href: '/studio/products' }]}
					page={'product.title'}
				/>
				<div className="flex flex-col border-b bg-muted/40">
					<div className="flex gap-4 p-6">
						<div className="h-full">
							<div className="border rounded-md p-2">
								<Skeleton className="h-[100px] w-[100px]" />
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<div className="flex gap-4">
								<div className="flex flex-col gap-0">
									<span className="text-xs text-muted-foreground">Title</span>
									<Skeleton className="w-[240px] h-[26px] mt-[2px]" />
								</div>
							</div>
							<div className="flex gap-4">
								<div className="flex flex-col gap-0">
									<span className="text-xs text-muted-foreground">Type</span>
									<Skeleton className="w-[150px] h-[19px] mt-[1px]" />
								</div>
								<div className="flex flex-col gap-0">
									<span className="text-xs text-muted-foreground">Author</span>
									<Skeleton className="w-[100px] h-[19px] mt-[1px]" />
								</div>
								<div className="flex flex-col gap-0">
									<span className="text-xs text-muted-foreground">Brand</span>
									<Skeleton className="w-[120px] h-[19px] mt-[1px]" />
								</div>
							</div>
						</div>
					</div>
					<div className="flex">
						<TabsList className="rounded-none w-full px-6 gap-4 justify-start">
							<TabsTrigger disabled value="properties">
								Product
							</TabsTrigger>
							<TabsTrigger disabled value="images">
								Images
							</TabsTrigger>
							<TabsTrigger disabled value="files">
								Files
							</TabsTrigger>
							<TabsTrigger disabled value="cross-stitch">
								Cross Stitch
							</TabsTrigger>
							<TabsTrigger disabled value="advanced">
								Advanced
							</TabsTrigger>
							<TabsTrigger disabled value="printable">
								Printable
							</TabsTrigger>
						</TabsList>
					</div>
				</div>
				<ViewContent className="bg-muted relative">
					<div className="absolute w-full h-full flex justify-center items-center">
						<Loader />
					</div>
				</ViewContent>
			</View>
		</Tabs>
	);
};
