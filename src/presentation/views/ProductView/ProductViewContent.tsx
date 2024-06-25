'use client';
import { AppViews } from '@/app/routes';
import { StitchFairyCoModule } from '@brand/StitchFairyCo';
import { Loader } from '@components/Spinner';
import {
	Button,
	Card,
	CardHeader,
	CardStack,
	CardTitle,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	View,
	ViewBreadcrumbs,
	ViewContent,
} from '@components/ui';
import { DangerZoneCard } from '@presentation/views/ProductView/cards/DangerZoneCard';
import { PatternCard } from '@presentation/views/ProductView/cards/PatternCard';
import { PdfCard } from '@presentation/views/ProductView/cards/PdfCard';
import { useProductContext } from '@presentation/views/ProductView/ProductContext';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { ImagesTabContent } from '../ProductImagesView/ImagesTabContent';
import { LaunchChecklistCard } from './cards/LaunchChecklistCard';
import { ProductViewHeader } from './ProductViewHeader';
import { CrossStitchPdf } from '@infrastructure/pdf/CrossStitchPdf';
import { AttributesCard } from './cards/AttributesCard';

enum ProductViewTab {
	Properties = 'properties',
	Images = 'images',
	Files = 'files',
	CrossStitch = 'cross-stitch',
	Advanced = 'advanced',
	Printable = 'printable',
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
							<TabsTrigger value={ProductViewTab.CrossStitch}>
								Cross Stitch
							</TabsTrigger>
							<TabsTrigger value={ProductViewTab.Advanced}>
								Advanced
							</TabsTrigger>
							<TabsTrigger value={ProductViewTab.Printable}>
								Printable
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
						<CardStack>
							<PdfCard />
						</CardStack>
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

				<TabsContent asChild value="cross-stitch">
					<ViewContent>
						<CardStack>
							<PdfCard />
							<Card>
								<CardHeader>
									<CardTitle className="flex gap-2">
										<span>PDF Settings</span>
										<Button className="ml-auto">Generate PDF</Button>
									</CardTitle>
								</CardHeader>
							</Card>
						</CardStack>
					</ViewContent>
				</TabsContent>

				<TabsContent asChild value="printable">
					<ViewContent fullWidth scrollX className="bg-muted">
						<div className="flex flex-col gap-12 px-6 py-12 items-center">
							<CrossStitchPdf
								product={product}
								config={StitchFairyCoModule.pdf}
							/>
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
