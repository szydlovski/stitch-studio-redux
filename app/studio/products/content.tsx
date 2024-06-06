import { Button } from '@/components/ui';
import { CreateProductDialog } from '@/application/product/CreateProduct/CreateProductDialog';
import { ProductList } from '@/application/product/ProductList/ProductList';
import { WandSparklesIcon } from 'lucide-react';

export const ListProductsContent = () => {
	return (
		<div className="p-6 bg-muted/40 h-full">
			<div className="flex">
				<h1 className="text-lg font-semibold md:text-2xl">Products</h1>
				<CreateProductDialog>
					<Button className="ml-auto flex gap-1" size="xs">
						<WandSparklesIcon size={16} />
						Create product
					</Button>
				</CreateProductDialog>
			</div>
			<ProductList />
		</div>
	);
};
