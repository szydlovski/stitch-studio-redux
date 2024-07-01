import { useMutation } from '@tanstack/react-query';

export interface UploadProductImageArgs {
	imageBase64: string;
	tags: string[];
}

export const uploadProductImage = (
	productId: string,
	args: UploadProductImageArgs
) => {
	return fetch(`/api/products/${productId}/images`, {
		method: 'POST',
		body: JSON.stringify(args),
	});
};

export const uploadProductImageMutationKey = () => ['uploadProductImage'];

export const useUploadProductImage = () => {
	return useMutation({
		mutationKey: uploadProductImageMutationKey(),
		mutationFn: async ({
			productId,
			...args
		}: { productId: string } & UploadProductImageArgs) => {
			const response = await uploadProductImage(productId, args);
			if (!response.ok) {
				throw new Error('Failed to upload image');
			}
			return response.json();
		},
	});
};
