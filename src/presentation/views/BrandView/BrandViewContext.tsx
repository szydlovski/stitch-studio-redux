import { useGetBrand } from '@application/brand';
import { QueryStatusGuard } from '@components/guard';
import { BrandDetails } from '@domain/brand';
import { ReactNode, createContext, useContext } from 'react';

interface BrandViewContextType {
	brand: BrandDetails;
}

const BrandViewContext = createContext<BrandViewContextType | undefined>(
	undefined
);

interface BrandViewContextProviderProps {
	brandId: string;
	children?: ReactNode;
	loadingContent?: ReactNode;
	errorContent?: ReactNode;
}

export const BrandViewContextProvider = ({
	brandId,
	children,
	loadingContent,
	errorContent,
}: BrandViewContextProviderProps) => {
	const { data: brand, status } = useGetBrand(brandId);
	return (
		<QueryStatusGuard
			props={brand}
			status={status}
			loadingContent={loadingContent}
			errorContent={errorContent}
		>
			{(brand) => (
				<BrandViewContext.Provider value={{ brand }}>
					{children}
				</BrandViewContext.Provider>
			)}
		</QueryStatusGuard>
	);
};

export const useBrandViewContext = () => {
	const context = useContext(BrandViewContext);
	if (context === undefined) {
		throw new Error('useBrandViewContext must be used within a BrandViewContextProvider');
	}
	return context;
};
