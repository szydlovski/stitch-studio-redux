import { DataTable } from '@components/DataTable';
import {
	Badge,
	Button,
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

export const BrandsContent = ({ brands }: { brands: BrandItem[] }) => {
	return (
		<div className="bg-muted/40">
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
									src={logo.src}
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
						key: 'owner',
						label: 'Owner',
						cell: ({ row: { owner } }) => <>{owner.name}</>,
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
		</div>
	);
};
