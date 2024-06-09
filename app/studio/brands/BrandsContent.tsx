import { MoreHorizontal } from 'lucide-react';

import { ListBrandRecord } from './listBrands';
import { DataTable } from '@/presentation/components/DataTable';
import { Button } from '@/presentation/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/presentation/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import Image from 'next/image';

export const BrandsContent = ({ brands }: { brands: ListBrandRecord[] }) => {
	return (
		<div className="bg-muted/40 p-6 min-h-full">
			<Card>
				<CardHeader>
					<CardTitle>Brands</CardTitle>
					<CardDescription>
						Manage brands, Etsy stores and cover templates.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable
						data={brands}
						columns={[
							{
								key: 'image',
								className: 'w-[100px]',
								cell: ({ row: { name, logo } }) => (
									// <Skeleton className="w-[64px] h-[64px] rounded-md" />
									<Image
										src={logo}
										alt={name}
										width={64}
										height={64}
										className="rounded-md"
									/>
								),
							},
							{
								key: 'name',
								label: 'Name',
								cell: ({ row: { name } }) => <>{name}</>,
							},
							{
								key: 'totalSales',
								label: 'Total Sales',
								cell: ({ row: { totalProducts } }) => <>{totalProducts}</>,
							},
							{
								key: 'owner',
								label: 'Owner',
								cell: ({ row: { owner } }) => <>{owner}</>,
							},
							{
								key: 'actions',
								cell: () => (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup="true" size="icon" variant="ghost">
												<MoreHorizontal className="h-4 w-4" />
												<span className="sr-only">Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								),
							},
						]}
					/>
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						Showing <strong>1-10</strong> of <strong>32</strong> products
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};
