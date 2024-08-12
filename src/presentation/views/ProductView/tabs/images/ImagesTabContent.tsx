'use client';
import {
	getProductImagesQueryKey,
	useGetProductImages,
	useUploadProductImage,
} from '@application/product-image';
import { LoadingButton, ViewContent } from '@components/ui';
import { dataUrlToXataBase64, selectFile } from '@presentation/utils';
import { useProductViewContext } from '@presentation/views/ProductView/ProductViewContext';
import { useQueryClient } from '@tanstack/react-query';
import { ConstructionIcon } from 'lucide-react';
import { MouseEvent, forwardRef, useCallback, useState } from 'react';
import { ProductImageTile, ProductImageTileSkeleton } from './ProductImageTile';
import { SelectionBar } from './SelectionBar';
import { CoverGeneratorDialog } from './components/CoverGenerator/CoverGeneratorDialog';
import {useDeleteProductImages} from "@application/product-image/deleteProductImage";

const readFileAsDataURL = (file: File) => {
	return new Promise<string>((resolve) => {
		const reader = new FileReader();
		reader.onload = (e) => resolve(e.target!.result as string);
		reader.readAsDataURL(file);
	});
};

export const ImagesTabContent = forwardRef<HTMLDivElement>((_, ref) => {
	const { product } = useProductViewContext();
	const { data: images, status } = useGetProductImages(product.id);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [lastSelectedIndex, setLastSelectedIndex] = useState<number>();
	const queryClient = useQueryClient();
	const handleSelected = (
		imageId: string,
		isSelected: boolean,
		index: number,
		evt: MouseEvent<HTMLButtonElement>
	) => {
		if (evt.shiftKey) {
			if (lastSelectedIndex !== undefined) {
				const start = Math.min(lastSelectedIndex, index);
				const end = Math.max(lastSelectedIndex, index);
				const selected = images?.slice(start, end + 1).map((i) => i.id) ?? [];
				setSelectedImages((prev) =>
					Array.from(new Set([...prev, ...selected]))
				);
				setLastSelectedIndex(undefined);
			}
		} else {
			if (isSelected) {
				setSelectedImages([...selectedImages, imageId]);
			} else {
				setSelectedImages(selectedImages.filter((id) => id !== imageId));
			}
			setLastSelectedIndex(index);
		}
	};

	const { mutateAsync, status: uploadStatus } = useUploadProductImage();

	const handleUploadImage = useCallback(async () => {
		const file = await selectFile();
		await mutateAsync({
			productId: product.id,
			imageBase64: await readFileAsDataURL(file).then((dataUrl) =>
				dataUrlToXataBase64(dataUrl)
			),
			tags: ['manual-upload'],
		});
		await queryClient.invalidateQueries({
			queryKey: getProductImagesQueryKey(product.id),
		});
	}, [mutateAsync, product.id, queryClient]);

	const { status: deleteStatus, mutateAsync: mutateDeleteAsync } = useDeleteProductImages();

	const handleDelete = useCallback(async () => {
		for (const id of selectedImages) {
			await mutateDeleteAsync({ productId: product.id, imageId: id });
		}
		await queryClient.invalidateQueries({
			queryKey: getProductImagesQueryKey(product.id),
		});
		setSelectedImages([])
	}, [queryClient, mutateDeleteAsync, product.id, selectedImages]);

	return (
		<ViewContent ref={ref} fullWidth className="flex-1 bg-muted relative">
			<div className="flex flex-col flex-1">
				<div className="p-6 pb-0">
					<div className="flex">
						<div className="flex gap-2 ml-auto">
							<CoverGeneratorDialog />
							<LoadingButton
								disabled={uploadStatus === 'pending'}
								loading={uploadStatus === 'pending'}
								onClick={handleUploadImage}
							>
								Upload image
							</LoadingButton>
						</div>
					</div>
				</div>
				<div className="p-6 pt-4">
					{status === 'error' ? (
						'Error'
					) : status === 'pending' ? (
						<div className="grid grid-cols-4 gap-4">
							{Array(12)
								.fill(0)
								.map((_, i) => (
									<ProductImageTileSkeleton key={i} />
								))}
						</div>
					) : images.length === 0 ? (
						<div className="flex flex-col gap-4 items-center py-12 px-6">
							<div className="bg-muted/40 w-full max-w-lg p-6 rounded-xl flex flex-col items-center gap-6">
								<ConstructionIcon
									size={48}
									className="text-foreground opacity-25"
								/>
								<div className="grid gap-1 text-center">
									<span className="font-bold text-lg">No images.</span>
									<span className="text-foreground/40 text-sm">
										Create mockups using the Cover Generator or upload images
										directly.
									</span>
								</div>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
							{images.map((image, index) => (
								<ProductImageTile
									key={image.src}
									image={image}
									active={false}
									selectionOngoing={selectedImages.length > 0}
									selected={selectedImages.includes(image.id)}
									onSelectedChange={(state, evt) =>
										handleSelected(image.id, state, index, evt)
									}
								/>
							))}
						</div>
					)}
				</div>
			</div>
			<SelectionBar
				selectedCount={selectedImages.length}
				onUnselect={() => setSelectedImages([])}
				onDelete={() => handleDelete()}
				deleteDisabled={deleteStatus === 'pending'}
			/>
		</ViewContent>
	);
});

ImagesTabContent.displayName = 'ImagesTabContent';
