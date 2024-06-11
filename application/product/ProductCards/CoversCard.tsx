'use client';
import { CoverGeneratorDialog } from '@/application/product-image/CoverGenerator/CoverGeneratorDialog';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/presentation/components/ui';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/presentation/components/ui/popover';
import { useDisclosure } from '@/lib/hooks/useDisclosure';
import { useQuery } from '@tanstack/react-query';
import { HexColorPicker } from 'react-colorful';
import { useProductContext } from '@/presentation/components/context/ProductContext';
import {
	ProductImageItem,
	ProductImageItemAttributes,
} from '@/domain/product-image/ProductImageItem';
import { ProductApiClient } from '@/infrastructure/product/ProductApiClient';
import { transformImage } from '@xata.io/client';

export const CoverColorPicker = ({
	color,
	onChange,
}: {
	color: string;
	onChange: (color: string) => void;
}) => {
	const { pattern } = useProductContext();
	const { state: isOpen, open, close, set: setOpen } = useDisclosure();
	return (
		<Popover open={isOpen} onOpenChange={setOpen}>
			<PopoverTrigger>
				<Button
					className="w-10 rounded-full"
					style={{ backgroundColor: color }}
				/>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-4xl">
				<HexColorPicker
					style={{ width: '100%' }}
					color={color}
					onChange={() => onChange(color)}
				/>
				<div className="p-2 grid grid-cols-6 gap-2 mt-0">
					{pattern.groups.map((color, i) => (
						<Button
							className="w-full rounded-full"
							style={{ backgroundColor: color.hex }}
							onClick={() => onChange(color.hex)}
						/>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export const GetProductImagesQueryKey = (productId: string) => ['productImages', productId];

export const useGetProductImages = (productId: string) => {
	return useQuery({
		queryKey: GetProductImagesQueryKey(productId),
		queryFn: () => new ProductApiClient().getImages(productId),
		select: (images) => images.map(ProductImageItem.fromAttributes),
	});
};

export const CoversCard = () => {
	const { product } = useProductContext();
	const { data: images } = useGetProductImages(product.id);
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<span>{'Covers'}</span>
					<div className="ml-auto">
						<CoverGeneratorDialog />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-4 gap-4">
					{images?.map(({ src, tags }, i) => (
						<div
							key={i}
							className="h-full aspect-square border rounded-md flex justify-center items-center"
						>
							<img
								className="max-h-full max-w-full flex-1 w-auto"
								src={transformImage(src, { height: 100 })}
							/>
							<div>
								<ul>
									{tags.map(tag => <li key={tag}>{tag}</li>)}
								</ul>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
