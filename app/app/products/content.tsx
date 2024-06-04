import { Button } from '@/components/ui';
import { CreateProductDialog } from '@/context/product/application/CreateProduct/CreateProductDialog';
import { ProductList } from '@/context/product/application/ProductList/ProductList';

export const ListProductsContent = () => {
	return (
		<div className="p-6 bg-muted/40 h-full">
			<div className="flex">
				<h1 className="text-lg font-semibold md:text-2xl">Products</h1>
				<CreateProductDialog>
					<Button className="ml-auto" size="xs">
						Create product
					</Button>
				</CreateProductDialog>
			</div>
			<ProductList />
		</div>
	);
};
