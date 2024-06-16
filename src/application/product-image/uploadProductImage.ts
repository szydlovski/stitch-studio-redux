import { useMutation } from '@tanstack/react-query';

export interface UploadProductImageArgs {
	productId: string;
	src: string;
	key: string;
}

const dataUrlToXataBase64 = (dataUrl: string) => {
	return dataUrl.split(',')[1];
};

export const uploadProductImage = ({
	productId,
	src,
	key,
}: UploadProductImageArgs) => {
	return fetch(`/api/products/${productId}/images`, {
		method: 'POST',
		body: JSON.stringify({ image: dataUrlToXataBase64(src), key }),
	});
};

export const uploadProductImageMutationKey = () => ['uploadProductImage'];

export const useUploadProductImage = () => {
	return useMutation({
		mutationKey: uploadProductImageMutationKey(),
		mutationFn: async (args: {
			productId: string;
			src: string;
			key: string;
		}) => {
			const response = await uploadProductImage(args);
			if (!response.ok) {
				throw new Error('Failed to upload image');
			}
			return response.json();
		},
	});
};
