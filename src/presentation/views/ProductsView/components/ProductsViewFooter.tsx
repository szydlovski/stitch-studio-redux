'use client';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@components/ui';

import { useProductsViewContext } from '../ProductsViewContext';

const generatePagination = (
	page: number,
	maxPage: number
): (number | '...')[] => {
	return Array.from(
		new Set([
			1,
			// 2,
			// 3,
			page - 1,
			page,
			page + 1,
			maxPage,
			// maxPage - 1,
			// maxPage - 2,
		])
	)
		.filter((p) => p > 0 && p <= maxPage)
		.sort((a, b) => a - b)
		.flatMap((p, i, arr) => {
			if (i === 0) return [p];
			const previous = arr[i - 1];
			if (p - previous === 1) return [p];
			return ['...', p];
		});
};

export const ProductsViewFooter = () => {
	const {
		currentPage,
		setCurrentPage,
		pageSize,
		setPageSize,
		query: { status },
		total,
		maxPage,
	} = useProductsViewContext();
	return (
		<div className="flex flex-col mt-6 justify-center items-center gap-2">
			<div className="flex flex-1 justify-center">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								disabled={currentPage === 1}
								onClick={() => setCurrentPage(currentPage - 1)}
							/>
						</PaginationItem>
						{generatePagination(currentPage, maxPage).map((page, index) => (
							<PaginationItem key={index}>
								{page === '...' ? (
									<PaginationEllipsis key={index} />
								) : (
									<PaginationLink
										isActive={currentPage === page}
										// disabled={page === currentPage}
										onClick={() => setCurrentPage(page)}
									>
										{page}
									</PaginationLink>
								)}
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								disabled={currentPage === maxPage}
								onClick={() => setCurrentPage(currentPage + 1)}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
			<div className="flex items-center gap-4">
				<div className="text-xs">
					{status === 'pending'
						? 'Loading...'
						: `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(
								currentPage * pageSize,
								total
						  )} of ${total} products`}
				</div>
				{/* <div className="w-0.5 h-6 bg-foreground/20" /> */}
				<div className="flex items-center gap-2">
					<Select
						value={pageSize.toString()}
						onValueChange={(value) => setPageSize(Number(value))}
					>
						<SelectTrigger className="w-[46px] h-[30px] bg-background px-1.5 text-xs">
							<SelectValue placeholder="Products per page" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{[16, 24, 32, 64].map((size) => (
									<SelectItem key={size} value={size.toString()}>
										{size}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<div className="text-xs">per page</div>
				</div>
			</div>
		</div>
	);
};
