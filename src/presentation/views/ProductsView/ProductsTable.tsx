'use client';
import {
	Button,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@components/ui';
import { BaseProductObject } from '@domain/product';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { EllipsisIcon } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';

export const ProductsTable = ({
	products,
}: {
	products: BaseProductObject[];
}) => {
	const columns: ColumnDef<BaseProductObject>[] = [
		{
			id: 'thumbnail',
			cell: ({ row: { original: product } }) => (
				<TableCell className="w-auto py-2 pl-6 pr-2 w-[140px]">
					<Image
						className=""
						src={product.thumbnail.src}
						alt={product.title}
						width={70}
						height={70}
					/>
				</TableCell>
			),
		},
		{
			id: 'title',
			header: 'Title',
			cell: ({ row: { original: product } }) => (
				<TableCell>{product.title}</TableCell>
			),
		},
		{
			id: 'author',
			header: 'Author',
			cell: ({ row: { original: product } }) => (
				<TableCell>{product.author.name}</TableCell>
			),
		},
		{
			id: 'brand',
			header: 'Brand',
			cell: ({ row: { original: product } }) => (
				<TableCell>{product.brand.name}</TableCell>
			),
		},
		{
			id: 'type',
			header: 'Type',
			cell: () => <TableCell>{'Cross Stitch'}</TableCell>,
		},
		{
			id: 'menu',
			cell: () => (
				<TableCell className='pr-6'>
					<Button size="icon-xs" variant="ghost">
						<EllipsisIcon size={16} />
					</Button>
				</TableCell>
			),
		},
	];
	const table = useReactTable({
		data: products,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && 'selected'}
						>
							{row.getVisibleCells().map((cell) => (
								<Fragment key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</Fragment>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-24 text-center">
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
