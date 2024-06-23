import { useMutation } from '@tanstack/react-query';

interface CreateProductDto {
	title: string;
	thumbnail: string;
	data: string;
}

export const createProduct = (body: CreateProductDto) => {
	return fetch('/api/products', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json());
};

export const useCreateProduct = () => {
	return useMutation({
		mutationFn: createProduct,
	});
};
