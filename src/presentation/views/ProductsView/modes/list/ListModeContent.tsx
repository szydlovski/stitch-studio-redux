'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@components/ui';
import { flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';
import { useProductsViewContext } from '../../ProductsViewContext';

export const ListModeContent = () => {
	const { table } = useProductsViewContext();
	return (
		<div className="p-2" style={{ '--row-height': '80px' } as any}>
			<div className="h-[30px] bg-blue-500 flex">
				{table.getHeaderGroups().map((headerGroup) => (
					<div key={headerGroup.id} className='flex bg-red-500'>
						{headerGroup.headers.map((header) => (
							<div key={header.id} className='bg-amber-500 w-[150px] border-r text-sm'>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</div>
						))}
					</div>
				))}
			</div>
			<div className=''>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<div key={row.id} className='flex border-b' data-state={row.getIsSelected() && 'selected'}>
							{row.getVisibleCells().map((cell) => (
								<div key={cell.id} className='w-[150px] border-r text-sm'>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</div>
							))}
						</div>
					))
				) : (
					<div>
						<div
							// colSpan={table.getVisibleLeafColumns().length}
							className="h-24 text-center"
						>
							No results.
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
