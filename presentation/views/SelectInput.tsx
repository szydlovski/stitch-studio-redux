'use client';
import { CreateProductDialog } from '@/application/product/CreateProduct/CreateProductDialog';
import { ProductList } from '@/application/product/ProductList/ProductList';
import { Button } from '@/presentation/components/ui';
import { WandSparklesIcon } from 'lucide-react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../components/ui/pagination';
import { ScrollArea } from '../components/ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select';
import React from 'react';

interface SelectOption {
	label: string;
	value: string;
}

interface SelectOptionGroup {
	label?: string;
	options: SelectOption[];
}

interface SelectInputProps
	extends Omit<React.ComponentPropsWithoutRef<typeof Select>, 'children'> {
	groups: SelectOptionGroup[];
	placeholder?: string;
}

export const SelectInput = React.forwardRef<
	React.ElementRef<typeof SelectValue>,
	SelectInputProps
>(({ groups, placeholder, ...props }, ref) => {
	return (
		<Select {...props}>
			<SelectTrigger className="x w-48">
				<SelectValue ref={ref} placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{groups.map(({ label, options }, i) => (
					<SelectGroup key={i}>
						{label && <SelectLabel>{label}</SelectLabel>}
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				))}
			</SelectContent>
		</Select>
	);
});

export const ProductListView = () => {
	return (
		<div className="flex flex-1 flex-col h-full bg-muted/40">
			<div className="flex p-6 border-b">
				<h1 className="text-lg font-semibold md:text-2xl">Products</h1>
				<CreateProductDialog>
					<Button className="ml-auto flex gap-1" size="xs">
						<WandSparklesIcon size={16} />
						Create product
					</Button>
				</CreateProductDialog>
			</div>
			<div className="flex gap-2 border-b bg-muted/40 py-2 px-6">
				<SelectInput
					disabled
					placeholder="Type"
					value="cross-stitch"
					groups={[
						{
							options: [
								{
									label: 'Cross Stitch',
									value: 'cross-stitch',
								},
								{
									label: 'Seamless',
									value: 'seamless',
								},
							],
						},
					]}
				/>
				<SelectInput
					disabled
					placeholder="Brand"
					value="stitchfairyco"
					groups={[
						{
							options: [
								{
									label: 'StitchFairyCo',
									value: 'stitchfairyco',
								},
								{
									label: 'Stitch Coven',
									value: 'stitchcoven',
								},
							],
						},
					]}
				/>
			</div>
			<div className="flex-1 bg-muted">
				<ScrollArea className="flex flex-col h-full">
					<div className="flex-1 h-1 flex flex-col gap-4">
						<div className="p-6">
							<ProductList />
						</div>
					</div>
				</ScrollArea>
			</div>
			<div className="flex px-6 py-2 border-t">
				<div>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href="#" />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#" isActive>
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">3</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href="#" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
				<div className="ml-auto">
					<Select defaultValue="16" disabled>
						<SelectTrigger className="w-[65px]">
							<SelectValue placeholder="Products per page" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="16">16</SelectItem>
								<SelectItem value="32">32</SelectItem>
								<SelectItem value="64">64</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};
