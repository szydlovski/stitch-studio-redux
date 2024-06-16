import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@components/ui';
import { BrandItem } from '@domain/brand/BrandItem';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DataTable } from '@components/DataTable';

export const BrandsContent = ({ brands }: { brands: BrandItem[] }) => {
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
								cell: ({ row: { id, name, logo } }) => (
									// <Skeleton className="w-[64px] h-[64px] rounded-md" />

									<Link href={`/studio/brands/${id}`}>
										<Image
											src={logo}
											alt={name}
											width={64}
											height={64}
											className="rounded-md"
										/>
									</Link>
								),
							},
							{
								key: 'name',
								label: 'Name',
								cell: ({ row: { id, name, etsy } }) => (
									<div className="flex gap-2">
										<Link href={`/studio/brands/${id}`}>{name}</Link>
										{etsy && (
											<Badge className="bg-orange-500 pointer-events-none">
												Etsy
											</Badge>
										)}
									</div>
								),
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
								cell: ({ row: { id, name } }) => (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup="true" size="icon" variant="ghost">
												<MoreHorizontal className="h-4 w-4" />
												<span className="sr-only">Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>{name}</DropdownMenuLabel>
											<DropdownMenuItem asChild>
												<Link href={`/studio/brands/${id}`}>View</Link>
											</DropdownMenuItem>
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
