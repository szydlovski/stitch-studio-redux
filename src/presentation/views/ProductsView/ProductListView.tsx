'use client';
import { SelectInput } from '@components/SelectInput';
import {
	Button,
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
	View,
	ViewActions,
	ViewContent,
	ViewFooter,
	ViewHeader,
	ViewTitle,
} from '@components/ui';
import { CreateProductDialog } from './CreateProduct/CreateProductDialog';
import { ProductList } from './ProductList/ProductList';
import { WandSparklesIcon } from 'lucide-react';

export const ProductListView = () => {
	return (
		<View className="bg-muted/40">
			<ViewHeader>
				<ViewTitle>{'Products'}</ViewTitle>
				<ViewActions>
					<CreateProductDialog>
						<Button className="flex gap-2" size="xs">
							<WandSparklesIcon size={16} />
							Create product
						</Button>
					</CreateProductDialog>
					<CreateProductDialog>
						<Button className="flex gap-2" size="xs">
							<WandSparklesIcon size={16} />
							Create product
						</Button>
					</CreateProductDialog>
				</ViewActions>
			</ViewHeader>
			<ViewHeader className="py-2 md:py-4 px-6">
				<div className="flex gap-2">
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
			</ViewHeader>
			<ViewContent fullWidth className="bg-muted">
				<div className="p-6">
					<ProductList />
				</div>
			</ViewContent>
			<ViewFooter>
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
			</ViewFooter>
		</View>
	);
};