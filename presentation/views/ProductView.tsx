'use client';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/presentation/components/ui/breadcrumb';
import {
	ProductContextProvider,
	useProductContext,
} from '@/presentation/components/context/ProductContext';
import { CoversCard } from '@/application/product/ProductCards/CoversCard';
import { DangerZoneCard } from '@/application/product/ProductCards/DangerZoneCard';
import { PatternCard } from '@/application/product/ProductCards/PatternCard';
import { PdfCard } from '@/application/product/ProductCards/PdfCard';
import { Loader } from '@/presentation/components/Spinner';
import Image from 'next/image';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge, Button, Card, CardHeader, CardTitle } from '../components/ui';
import { PrinterIcon } from 'lucide-react';
import { useRef } from 'react';
import { StitchFairyCoPdf } from '@/brand/StitchFairyCo/pdf/StitchFairyCoPdf';

const pdfUrl = `https://stitch-studio-redux-printer-api-pdfs.s3.amazonaws.com/FRu4XunhVIFlWPEjB3-WU.pdf?AWSAccessKeyId=ASIAZBDLMNDMOSRQB3MA&Expires=1718045804&Signature=xwoAy2i2wlcido%2Bp9z%2BQofdfUXY%3D&X-Amzn-Trace-Id=Root%3D1-66673e47-29f53204217dd65d5d3deaf7%3BParent%3D051444645caac7e1%3BSampled%3D0%3BLineage%3D60d5498b%3A0&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQD68TFS6ycT19JoRcAKFTh5OrJiiMYoowLv5gUcwtofzwIgTtvpqyqaxTeTOJNVQeAULLcktO6b%2FgvkPmqeF5rG2%2FkqowMISxAAGgw2MjA4NDc5ODI4MDgiDE5Kn7R1mdP81POBZiqAA1iZQCCnSNY%2Bs4o5HiwjZBTPqogI9wDnfZX0FfHvSQkDwVf0N0qtjskIxRGkv%2FElVZQgH9AwnB4gDPh%2Fd6Z7DhhCqV7TAqtvzBu1gt4xlyQGjdWAQrDUoW%2Fe6WGVPmf0gBR69GwmpcP0V0mzBEzlKERk8W%2Fpx3%2FtbmW0aipLN1YL%2B29WKbg6Dx42lpXKz3nJomCaZOCoLVc06ysWRQqSPFqFajliO1nIMxBR2ekRc4Nz6z%2FD93KG8REyY3gnq0atagR75wI28FD1Lm59xotBprLzgTmjg%2BA7N6KtGvQMJozItxuZnekOo6YtIijA9OiVDE4BGYU1vviTznrKhbgHQkEQB8ZxX6yRYA67lw%2FhOiVmpnAvnzewX0BSfYUgweSf5qD1pSD%2BpYIIzu%2FUFlbp6iWV7kijJAlx7ziDI%2Fsayb7sLjeQEEvSgMnnwsBZtZU%2FDnTfQfxCJahkAwEs63cHirJ6umX7cDYFAyQqT8hqEAvp%2Fe0qERAT0lvhTvCe7lopfjDI%2FJyzBjqdARAKDK57nU6t%2BghL64U%2F%2BEjSt0VEoh4rVPoLj6BTVVPjNJcfaPpHGDSKe1%2Bk5XsIjW6I5subks9bwUajujQbTz1jaM6C%2BrVid9pO%2FV1jk8%2F9P1OtYktw0cZK1nY%2BvShTgUz7SKMlF7wR9IYvprWV5I2ooI8K3vcIpUmaQhxY2Nstc0U7uZytlYtUB1uGewBkYXMv8vPqCgAKW67hbLU%3D`;

const ProductBreadcrumbs = () => {
	const { product } = useProductContext();
	return (
		<div className="flex flex-col py-3 px-6 gap-4 ">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/studio/products">Products</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{product.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

const ProductHeader = ({ children }: { children?: React.ReactNode }) => {
	const { product } = useProductContext();
	return (
		<div className="flex flex-col p-6 gap-4 border-y bg-background">
			<div className="flex gap-4">
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
			<div>{children}</div>
		</div>
	);
};

const ProductViewContent = () => {
	const { product } = useProductContext();
	const iframeRef = useRef<HTMLIFrameElement>(null);
	return (
		<Tabs defaultValue="home" className="flex flex-1 flex-col h-full">
			<ProductBreadcrumbs />
			<ProductHeader>
				<TabsList>
					<TabsTrigger value="properties">Product</TabsTrigger>
					<TabsTrigger value="images">Images</TabsTrigger>
					<TabsTrigger value="files">Files</TabsTrigger>
					<TabsTrigger value="cross-stitch">Cross Stitch</TabsTrigger>
					<TabsTrigger value="advanced">Advanced</TabsTrigger>
					<TabsTrigger value="printable">Printable</TabsTrigger>
				</TabsList>
			</ProductHeader>

			<TabsContent value="properties" className="mt-0 flex-1">
				<ScrollArea className="flex flex-col h-full bg-muted/40">
					<div className="flex-1 h-1 flex flex-col p-6 gap-4">
						<PatternCard />
					</div>
				</ScrollArea>
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
		</Tabs>
	);
};

export const ProductView = ({ productId }: { productId: string }) => {
	return (
		<ProductContextProvider
			productId={productId}
			loadingContent={
				<div className="w-full h-full flex justify-center items-center">
					<Loader />
				</div>
			}
		>
			<ProductViewContent />
		</ProductContextProvider>
	);
};
