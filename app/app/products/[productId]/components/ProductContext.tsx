'use client';
import { ProductDetails } from '@/app/api/products/[productId]/route';
import { Pattern } from '@/lib/pattern/pattern';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

interface ProductContextType {
	product: ProductDetails;
	pattern: Pattern;
}

export const ProductContext = createContext<ProductContextType | undefined>(
	undefined
);

export const ProductContextProvider = ({
	productId,
	children,
	loadingContent,
	errorContent,
}: {
	productId: string;
	children?: React.ReactNode;
	loadingContent?: React.ReactNode;
	errorContent?: React.ReactNode;
}) => {
	const { data, status } = useQuery<ProductDetails>({
		queryKey: ['product', productId],
		queryFn: () =>
			fetch(`/api/products/${productId}`).then((res) => res.json()),
	});

	return status === 'error' ? (
		errorContent
	) : status === 'pending' ? (
		loadingContent
	) : (
		<ProductContext.Provider
			value={{ product: data, pattern: Pattern.fromData(data.data) }}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error('useProductContext must be used within a ProductContext');
	}
	return context;
};
