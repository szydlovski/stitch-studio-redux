import { useMutation } from '@tanstack/react-query';

export const deleteProduct = (id: string) => {
	return fetch(`/api/products/${id}`, {
		method: 'DELETE',
	}).then((res) => res.json());
};

export const useDeleteProduct = () => {
	return useMutation({
		mutationFn: deleteProduct,
	});
};
