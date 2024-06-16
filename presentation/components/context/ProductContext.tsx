'use client';
import { ProductDetails } from '@/domain/product/ProductDetails';
import { ProductApiClient } from '@/infrastructure/product/ProductApiClient';
import { CrossStitchPattern } from '@/domain/cross-stitch';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext } from 'react';

interface ProductContextType {
	product: ProductDetails;
	pattern: CrossStitchPattern;
}

export const ProductContext = createContext<ProductContextType | undefined>(
	undefined
);

export const ProductContextProvider = ({
	productId,
	children,
	loadingContent = null,
	errorContent = null,
}: {
	productId: string;
	children?: ReactNode;
	loadingContent?: ReactNode;
	errorContent?: ReactNode;
}) => {
	const { data, status } = useQuery<ProductDetails>({
		queryKey: ['product', productId],
		queryFn: () => new ProductApiClient().get(productId),
	});

	return (
		<>
			{status === 'error' ? (
				errorContent ?? <>Error</>
			) : status === 'pending' ? (
				loadingContent
			) : (
				<ProductContext.Provider
					value={{
						product: data,
						pattern: CrossStitchPattern.fromAttributes(data.data),
					}}
				>
					{children}
				</ProductContext.Provider>
			)}
		</>
	);
};

export const useProductContext = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error('useProductContext must be used within a ProductContext');
	}
	return context;
};
