'use client';
import { CoversCard } from '@/application/product/ProductCards/CoversCard';
import { DangerZoneCard } from '@/application/product/ProductCards/DangerZoneCard';
import { PatternCard } from '@/application/product/ProductCards/PatternCard';
import { PdfCard } from '@/application/product/ProductCards/PdfCard';
import { StitchFairyCoPdf } from '@/brand/StitchFairyCo/pdf/StitchFairyCoPdf';
import { useProductContext } from '@/presentation/components/context/ProductContext';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/presentation/components/ui/breadcrumb';
import Image from 'next/image';
import { Fragment, useRef } from 'react';
import { Button, Card, CardHeader, CardTitle } from '../../components/ui';
import { ScrollArea } from '../../components/ui/scroll-area';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/tabs';
import {
	View,
	ViewContent,
	ViewHeader,
} from '@/presentation/components/ui/view';

interface BreadcrumbItem {
	label: string;
	href: string;
}

interface ViewBreadcrumbsProps {
	items: BreadcrumbItem[];
	page: string;
}

const ViewBreadcrumbs = ({ items, page }: ViewBreadcrumbsProps) => {
	return (
		<div className="flex flex-col py-3 px-6 gap-4">
			<Breadcrumb>
				<BreadcrumbList>
					{items.map(({ label, href }, index) => (
						<Fragment key={index}>
							<BreadcrumbItem>
								<BreadcrumbLink href={href}>{label}</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
					))}
					<BreadcrumbItem>
						<BreadcrumbPage>{page}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
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
				<div className="flex flex-col pt-6 gap-6 border-y bg-background">
					<div className="flex gap-4 px-6">
						<div className="h-full">
							<div className="border rounded-md p-2">
								<Image
									width={100}
									height={100}
									alt={product.title}
									src={product.thumbnail.src}
								/>
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
									<h2 className="text-sm">{product.brand?.name}</h2>
								</div>
							</div>
						</div>
					</div>
					<div className="flex">
						<TabsList className="x rounded-b-none rounded-l-none px-6 gap-4">
							<TabsTrigger value="properties">Product</TabsTrigger>
							<TabsTrigger value="images">Images</TabsTrigger>
							<TabsTrigger value="files">Files</TabsTrigger>
							<TabsTrigger value="cross-stitch">Cross Stitch</TabsTrigger>
							<TabsTrigger value="advanced">Advanced</TabsTrigger>
							<TabsTrigger value="printable">Printable</TabsTrigger>
						</TabsList>
					</div>
				</div>
				<ViewContent className="flex flex-col h-full">
					<TabsContent value="properties" className="p-6">
						<PatternCard />
					</TabsContent>
					<TabsContent value="images" className="mt-0 flex-1">
						<ScrollArea className="flex flex-col h-full bg-muted/40">
							<div className="flex-1 h-1 flex flex-col p-6 gap-4">
								<CoversCard />
							</div>
						</ScrollArea>
					</TabsContent>
					<TabsContent value="files" className="mt-0 flex-1">
						<ScrollArea className="flex flex-col h-full bg-muted/40">
							<div className="flex-1 h-1 flex flex-col p-6 gap-4">
								<PdfCard />
							</div>
						</ScrollArea>
					</TabsContent>
					<TabsContent value="advanced" className="mt-0 flex-1">
						<ScrollArea className="flex flex-col h-full bg-muted/40">
							<div className="flex-1 h-1 flex flex-col p-6 gap-4">
								<DangerZoneCard />
							</div>
						</ScrollArea>
					</TabsContent>
					<TabsContent value="cross-stitch" className="mt-0 flex-1">
						<ScrollArea className="flex flex-col h-full bg-muted/40">
							<div className="flex-1 h-1 flex flex-col p-6 gap-4">
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
						</ScrollArea>
					</TabsContent>
					<TabsContent value="printable" className="mt-0 flex-1">
						<ScrollArea className="flex flex-col h-full bg-muted/40">
							<div className="flex-1 h-1">
								<div className="flex flex-col gap-12 px-6 py-12 items-center">
									<StitchFairyCoPdf product={product} />
								</div>
							</div>
						</ScrollArea>
					</TabsContent>
				</ViewContent>
			</View>
		</Tabs>
	);
};
