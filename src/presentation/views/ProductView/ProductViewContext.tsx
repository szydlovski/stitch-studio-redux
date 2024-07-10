'use client';
import { useGetProduct } from '@application/product';
import { QueryStatusGuard } from '@components/guard';
import { CrossStitchPattern } from '@domain/cross-stitch';
import { FullProductObject } from '@domain/product';
import { useDisclosure } from '@lib/hooks/useDisclosure';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ProductContextType {
	product: FullProductObject;
	pattern: CrossStitchPattern;
}

export const ProductViewContext = createContext<ProductContextType | undefined>(
	undefined
);

interface HostedDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

type HostedDialog = (props: HostedDialogProps) => ReactNode;

const useDialogHost = <K extends string>(
	config: Record<K, HostedDialog>
) => {
	const { state: isOpen, set: onOpenChange, open, close } = useDisclosure();
	const [key, setKey] = useState<K>(Object.keys(config)[0] as K);
	const Component = config[key] as HostedDialog;
	const content = <Component open={isOpen} onOpenChange={onOpenChange} />;
	return {
		content,
		openDialog: (key: K) => {
			close();
			setKey(key);
			open();
		},
	};
};

export const ProductViewContextProvider = ({
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
		<QueryStatusGuard
			status={status}
			props={data}
			loadingContent={loadingContent}
			errorContent={errorContent}
		>
			{(data) => (
				<ProductViewContext.Provider
					value={{
						product: data,
						pattern: CrossStitchPattern.fromSerialized(data.data),
					}}
				>
					{children}
				</ProductViewContext.Provider>
			)}
		</QueryStatusGuard>
	);
};

export const useProductViewContext = () => {
	const context = useContext(ProductViewContext);
	if (!context) {
		throw new Error('useProductContext must be used within a ProductContext');
	}
	return context;
};
