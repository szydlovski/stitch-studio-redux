'use client';
import { useGetProduct } from '@application/product';
import { CrossStitchPattern } from '@domain/cross-stitch';
import { ProductDetails } from '@domain/product/ProductDetails';
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
	const { data, status } = useGetProduct(productId);

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
