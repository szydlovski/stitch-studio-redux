'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useCoverGeneratorContext } from '../CoverGeneratorContext';
import { CoverGeneratorActions, CoverRenderState } from '../reducer';
import { useUploadProductImage } from '@application/product-image/uploadProductImage';

export const useCoversUploader = () => {
	const {
		product,
		dispatch,
		state,
		close: closeGenerator,
	} = useCoverGeneratorContext();

	const queryClient = useQueryClient();

	const { renders } = state;
	const setRenders = useCallback(
		(renders: CoverRenderState[]) =>
			dispatch(CoverGeneratorActions.setState({ renders })),
		[dispatch]
	);

	const { mutateAsync } = useUploadProductImage();

	const handleSave = useCallback(async () => {
		for (const { src, key } of renders) {
			setRenders(renders.map((render) => ({ ...render, uploading: true })));
			await mutateAsync({ productId: product.id, src, key });
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
	return handleSave;
};
