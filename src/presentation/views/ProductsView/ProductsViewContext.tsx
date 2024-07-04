'use client';
import { useListProducts } from '@application/product';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import {
	NumberParam,
	QueryParamConfig,
	createEnumParam,
	useQueryParam,
	withDefault,
} from 'use-query-params';
import { ProductsViewMode } from './types';
import { BaseProductObject } from '@domain/product';
import { Table } from '@tanstack/react-table';
import { useProductsTableSetup } from './useProductsTableSetup';

export const ArrayParam: QueryParamConfig<string[] | undefined> = {
	encode: (value) => {
		if (!value || value.length === 0) return null;
		return value;
	},
	decode: (input) => {
		if (input === null || input === undefined) return undefined;
		if (typeof input === 'string') {
			if (input === '') return undefined;
			return [input];
		}
		if (input.length === 0) return undefined;
		return input.filter<string>((i): i is string => typeof i === 'string');
	},
};

interface ProductListContextType {
	table: Table<BaseProductObject>;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	pageSize: number;
	setPageSize: (size: number) => void;
	filters: {
		type: string[];
		setTypes: (types: string[]) => void;
		brand: string[];
		setBrands: (brands: string[]) => void;
	};
	query: ReturnType<typeof useListProducts>;
	total: number;
	maxPage: number;
	viewMode: ProductsViewMode;
	setViewMode: (mode: ProductsViewMode) => void;
}

const ProductsViewContext = createContext<ProductListContextType | undefined>(
	undefined
);

export const ProductsViewProvider = ({ children }: { children: ReactNode }) => {
	const [currentPage, setCurrentPage] = useQueryParam(
		'page',
		withDefault(NumberParam, 1)
	);
	const [pageSize, setPageSize] = useQueryParam(
		'pageSize',
		withDefault(NumberParam, 16)
	);
	const [type = [], setTypes] = useQueryParam('type', ArrayParam);
	const [brand = [], setBrands] = useQueryParam('brand', ArrayParam);

	const query = useListProducts({
		brand,
		limit: pageSize,
		offset: (currentPage - 1) * pageSize,
	});

	const total = query.data?.total ?? 0;

	const maxPage = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);
	const [viewMode, setViewMode] = useQueryParam(
		'mode',
		withDefault(
			createEnumParam(Object.values(ProductsViewMode)),
			ProductsViewMode.Grid
		)
	);

	const table = useProductsTableSetup({ products: query.data?.products ?? [] });

	return (
		<ProductsViewContext.Provider
			value={{
				table,
				currentPage,
				setCurrentPage,
				pageSize,
				setPageSize,
				filters: {
					type,
					setTypes,
					brand,
					setBrands,
				},
				query,
				total,
				maxPage,
				viewMode,
				setViewMode,
			}}
		>
			{children}
		</ProductsViewContext.Provider>
	);
};

export const useProductsViewContext = () => {
	const context = useContext(ProductsViewContext);
	if (!context) {
		throw new Error(
			'useProductsViewContext must be used within ProductsViewProvider'
		);
	}
	return context;
};
