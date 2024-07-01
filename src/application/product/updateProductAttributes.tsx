import { ProductAttributes } from '@domain/product/types';
import { UpdateProductAttributesQueryResult } from '@infrastructure/product/UpdateProductAttributesQuery';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const updateProductAttributes = (
	id: string,
	body: ProductAttributes
) => {
	return fetch(`/api/products/${id}/attributes`, {
		method: 'PATCH',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json());
};

type UpdateProductAttributesVars = { id: string; body: ProductAttributes };

export const useUpdateProductAttributes = (
	options?: Omit<
		UseMutationOptions<
			UpdateProductAttributesQueryResult,
			Error,
			UpdateProductAttributesVars,
			unknown
		>,
		'mutationFn'
	>
) => {
	return useMutation<
		UpdateProductAttributesQueryResult,
		Error,
		UpdateProductAttributesVars,
		unknown
	>({
		...options,
		mutationFn: ({ id, body }) => updateProductAttributes(id, body),
	});
};
