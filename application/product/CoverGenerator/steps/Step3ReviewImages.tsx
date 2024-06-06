'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	RenderedProductImage,
	renderStitchFairyCovers,
} from '@/lib/templateRendering';
import { useCoverGeneratorContext } from '../CoverGeneratorContext';
import { ImagesGrid, ImagesGridSkeleton } from '../ImagesGrid';
import {
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import isEqual from 'lodash.isequal';

const dataUrlToXataBase64 = (dataUrl: string) => {
	return dataUrl.split(',')[1];
};

export const Step3ReviewImages = () => {
	const {
		product,
		pattern,
		state,
		renders,
		setRenders,
		rendersLoading,
		setRendersLoading,
		lastRenderedState,
		setLastRenderedState,
		closeGenerator,
	} = useCoverGeneratorContext();

	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationKey: ['uploadProductImage'],
		mutationFn: async ({ src, key }: { src: string; key: string }) => {
			const response = await fetch(`/api/products/${product.id}/images`, {
				method: 'POST',
				body: JSON.stringify({ image: dataUrlToXataBase64(src), key }),
			});
			if (!response.ok) {
				throw new Error('Failed to upload image');
			}
			return response.json();
		},
	});

	const handleSave = useCallback(async () => {
		for (const { src, render } of renders) {
			setRenders(renders.map((render) => ({ ...render, uploading: true })));
			await mutateAsync({ src, key: render.key });
			setRenders(
				renders.map((render) => ({
					...render,
					uploading: false,
					uploaded: true,
				}))
			);
			await queryClient.invalidateQueries({
				queryKey: ['covers', product.id],
			});
			closeGenerator();
		}
	}, [mutateAsync, renders]);

	useEffect(() => {
		if (isEqual(state, lastRenderedState)) {
			return;
		}

		setRendersLoading(true);
		renderStitchFairyCovers({
			pattern,
			state,
		}).then((renders) => {
			setRenders(
				renders.map((render) => ({ render, src: render.canvas.toDataURL() }))
			);
			setRendersLoading(false);
			setLastRenderedState(state);
		});
	}, [pattern, state]);
	return (
		<>
			<DialogHeader className="mb-6">
				<DialogTitle className="flex gap-4 items-center">
					{'Review generated images'}
				</DialogTitle>
				<DialogDescription>
					{`Review the generated images and save them to your product.`}
				</DialogDescription>
			</DialogHeader>
			<>
				{!rendersLoading ? (
					<ImagesGrid images={renders} />
				) : (
					<ImagesGridSkeleton />
				)}
			</>
			<DialogFooter className="mt-6">
				<Button type="submit" onClick={handleSave}>
					Save
				</Button>
			</DialogFooter>
		</>
	);
};
