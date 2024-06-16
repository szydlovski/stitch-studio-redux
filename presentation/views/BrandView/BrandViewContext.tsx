import { BrandDetails } from '@/domain/brand/BrandDetails';
import { createContext, useContext } from 'react';

interface BrandViewContextType {
	brand: BrandDetails;
}

const BrandViewContext = createContext<BrandViewContextType | undefined>(undefined);

interface BrandViewProviderProps {
	children: React.ReactNode;
}

export const BrandViewContextProvider = ({ children }: BrandViewProviderProps) => {
	return (
		<BrandViewContext.Provider value={{ brand: {} as BrandDetails }}>
			{children}
		</BrandViewContext.Provider>
	);
};

export const useBrandViewContext = () => {
  const context = useContext(BrandViewContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
