'use client';
import { Checkbox } from '@/presentation/components/ui/checkbox';
import { ScrollArea } from '@/presentation/components/ui/scroll-area';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { cn } from '@/lib';
import { CheckIcon } from 'lucide-react';

interface ImageItem {
	src: string;
	selected?: boolean;
	uploading?: boolean;
	uploaded?: boolean;
	error?: boolean;
	errorMessage?: string;
}

interface ImageGridProps {
	images: ImageItem[];
}

export const ImagesGrid = ({ images }: ImageGridProps) => {
	return (
		<ScrollArea className="pr-4">
			<div className="w-full max-w-full flex-1 max-h-[410px]">
				<div className="grid grid-cols-4 gap-4 h-full">
					{images.map(({ src, uploaded, uploading }, i) => (
						<div
							key={i}
							className={cn(
								'relative group flex items-center justify-center bg-muted rounded-md border aspect-square',
								{
									'opacity-50': uploading,
								}
							)}
						>
							{!(uploading || uploaded) && (
								<div className="absolute bottom-0 left-0 w-full flex p-2">
									<Checkbox className="w-8 h-8 bg-muted" checked />
								</div>
							)}
							{uploaded && <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-muted/50">
								<div className="h-12 w-12 rounded-full bg-foreground text-background flex justify-center items-center">
									<CheckIcon size={24} />
								</div>
							</div>}
							<img src={src} className="max-h-full" alt={'Generated cover'} />
						</div>
					))}
				</div>
			</div>
		</ScrollArea>
	);
};

export const ImagesGridSkeleton = () => {
	return (
		<ScrollArea className="pr-4">
			<div className="w-full max-w-full flex-1 max-h-[410px]">
				<div className="grid grid-cols-4 gap-4 h-full">
					{Array(8)
						.fill(0)
						.map((_, i) => (
							<div
								key={i}
								className="relative group flex items-center justify-center bg-muted rounded-md border aspect-square"
							>
								<Skeleton className="max-h-full aspect-square" />
							</div>
						))}
				</div>
			</div>
		</ScrollArea>
	);
};