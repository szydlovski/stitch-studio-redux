'use client';
import { AppViews } from '@/app/routes';
import { StitchFairyCoModule } from '@brand/StitchFairyCo';
import { Loader } from '@components/Spinner';
import {
	Button,
	CardStack,
	Dialog,
	DialogContent,
	DialogTrigger,
	ScrollArea,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	View,
	ViewBreadcrumbs,
	ViewContent,
} from '@components/ui';
import { CrossStitchPdf } from '@infrastructure/pdf/CrossStitchPdf';
import { useProductContext } from '@presentation/views/ProductView/ProductContext';
import { DangerZoneCard } from '@presentation/views/ProductView/cards/DangerZoneCard';
import { PatternCard } from '@presentation/views/ProductView/cards/PatternCard';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { ImagesTabContent } from '../ProductImagesView/ImagesTabContent';
import { ProductViewHeader } from './ProductViewHeader';
import { AttributesCard } from './cards/AttributesCard';
import { LaunchChecklistCard } from './cards/LaunchChecklistCard';

enum ProductViewTab {
	Properties = 'properties',
	Images = 'images',
	Files = 'files',
	Advanced = 'advanced',
}

export const ProductViewContent = () => {
	const { product } = useProductContext();
	const [tab, setTab] = useQueryParam(
		'tab',
		withDefault(StringParam, ProductViewTab.Properties)
	);
	return (
		<Tabs asChild value={tab} onValueChange={(value) => setTab(value)}>
			<View>
				<ViewBreadcrumbs
					items={[{ label: 'Products', href: AppViews.Products() }]}
					page={product.title}
				/>
				<div className="flex flex-col border-b bg-muted/40">
					<ProductViewHeader />
					<div className="flex">
						<TabsList className="rounded-none w-full px-6 gap-4 justify-start">
							<TabsTrigger value={ProductViewTab.Properties}>
								Product
							</TabsTrigger>
							<TabsTrigger value={ProductViewTab.Images}>Images</TabsTrigger>
							<TabsTrigger value={ProductViewTab.Files}>Files</TabsTrigger>
							<TabsTrigger value={ProductViewTab.Advanced}>
								Advanced
							</TabsTrigger>
						</TabsList>
					</div>
				</div>
				<TabsContent asChild value="properties">
					<ViewContent>
						<CardStack>
							<LaunchChecklistCard />
							<PatternCard />
						</CardStack>
					</ViewContent>
				</TabsContent>

				<TabsContent asChild value="images">
					<ImagesTabContent />
				</TabsContent>

				<TabsContent asChild value="files">
					<ViewContent>
						<div>Hello world</div>
					</ViewContent>
				</TabsContent>

				<TabsContent asChild value="advanced">
					<ViewContent>
						<CardStack>
							<DangerZoneCard />
							<AttributesCard />
						</CardStack>
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
					items={[{ label: 'Products', href: AppViews.Products() }]}
					page={<Skeleton className="w-[140px] h-[20px]" />}
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
