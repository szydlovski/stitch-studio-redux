'use client';
import { useDisclosure } from '@/lib/hooks/useDisclosure';
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	Textarea,
} from '@components/ui';
import { EtsyListingAttributes } from '@domain/etsy/types';
import { GetListingResponse } from '@infrastructure/etsy/EtsyV3OpenApiClient';
import { Link2Icon, SquareArrowOutUpRightIcon, ZoomInIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const TagList = ({ tags }: { tags: string[] }) => (
	<div className="flex flex-col gap-2">
		<h2 className="text-md font-semibold">Tags</h2>
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<div
					key={tag}
					className="py-1 px-3 text-sm rounded-full border bg-muted"
				>
					{tag}
				</div>
			))}
		</div>
	</div>
);

export const ListingCard = ({
	listing,
	data,
}: {
	listing: EtsyListingAttributes;
	data: GetListingResponse;
}) => {
	const images = data.images;
	const [imageIdx, setImageIdx] = useState(0);
	const { state: isOpen, set: setOpen, open } = useDisclosure();
	return (
		<Card>
			<CardHeader className="flex flex-col gap-2">
				<CardTitle>{data.title}</CardTitle>
				<div className="flex">
					<div>
						<Badge variant="outline" className="flex gap-2">
							<Link2Icon size={16} />
							<span className="leading-5">Linked to product</span>
						</Badge>
					</div>
					<Button className="ml-auto" size="sm" variant="etsy" asChild>
						<a href={data.url} target="_blank">
							<SquareArrowOutUpRightIcon size={16} />
							<span>View on Etsy</span>
						</a>
					</Button>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-4 max-w-full">
				<div className="flex flex-1 gap-2 flex-wrap">
					{data.images.map((image, i) => (
						<div
							key={image.listing_image_id}
							className="relative w-32 aspect-square bg-muted border flex items-center p-2"
						>
							<Image
								src={image.url_170x135}
								width={170}
								height={135}
								alt={`Image ${i + 1}`}
							/>
							<div className="absolute right-0 bottom-0 p-2">
								<Button
									variant="secondary"
									size="icon"
									className="opacity-50"
									onClick={() => {
										open();
										setImageIdx(i);
									}}
								>
									<ZoomInIcon size={16} />
								</Button>
							</div>
						</div>
					))}
				</div>
				<TagList tags={data.tags} />
				<div className="flex flex-col gap-2">
					<h2 className="text-md font-semibold">Description</h2>
					<Textarea readOnly rows={20} value={data.description} />
				</div>
			</CardContent>
			<Dialog open={isOpen} onOpenChange={setOpen}>
				<DialogContent className="max-w-full max-h-full sm:max-w-[calc(100vw-40px)] sm:max-h-[calc(100vh-40px)] flex flex-col justify-center items-center">
					<div className="bg-red-300 p-4">
						<Image
							className="max-h-full"
							alt={`Image ${imageIdx + 1}`}
							src={images[imageIdx].url_fullxfull}
							width={images[imageIdx].full_width}
							height={images[imageIdx].full_height}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</Card>
	);
};
