'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useCoverGeneratorContext } from '../CoverGeneratorContext';
import { CoverGeneratorActions, CoverRenderState } from '../reducer';

const dataUrlToXataBase64 = (dataUrl: string) => {
	return dataUrl.split(',')[1];
};

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
		for (const { src, key } of renders) {
			setRenders(renders.map((render) => ({ ...render, uploading: true })));
			await mutateAsync({ src, key });
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
