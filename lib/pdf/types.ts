import { ProductDetails } from '@/domain/product/ProductDetails';
import { Pattern } from '@/lib/pattern/pattern';

export interface PdfPageProps {
	product: ProductDetails;
	pattern: Pattern;
}
