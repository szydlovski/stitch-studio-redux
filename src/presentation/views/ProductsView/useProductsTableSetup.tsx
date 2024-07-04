'use client';
import { Button, TableCell } from '@components/ui';
import { BaseProductObject } from '@domain/product';
import { EllipsisIcon } from 'lucide-react';
import { useState } from 'react';

import {
	ColumnDef,
	VisibilityState,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import { transformImage } from '@xata.io/client';

export const useProductsTableSetup = ({
	products,
}: {
	products: BaseProductObject[];
}) => {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const columns: ColumnDef<BaseProductObject>[] = [
		{
			id: 'thumbnail',
			cell: ({ row: { original: product } }) => {
				return (
					<div className="w-[var(--row-height)] h-[var(--row-height)] mx-auto p-2">
						<Image
							className="w-full h-full object-contain"
							src={product.thumbnail}
							alt={product.title}
						/>
					</div>
				);
			},
		},
		{
			id: 'title',
			header: 'Title',
			cell: ({ row: { original: product } }) => (
				<div>{product.title}</div>
			),
		},
		{
			id: 'author',
			header: 'Author',
			cell: ({ row: { original: product } }) => (
				<div>{product.author.name}</div>
			),
		},
		{
			id: 'brand',
			header: 'Brand',
			cell: ({ row: { original: product } }) => (
				<div>{product.brand.name}</div>
			),
		},
		{
			id: 'type',
			header: 'Type',
			cell: () => <div>{'Cross Stitch'}</div>,
		},
		{
			id: 'menu',
			cell: () => (
				<div className="">
					<Button size="icon-xs" variant="ghost">
						<EllipsisIcon size={16} />
					</Button>
				</div>
			),
		},
	];
	const table = useReactTable({
		data: products,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			columnVisibility,
		},
	});
	return table;
};
