import { ProductDetails } from '@/context/product/domain/ProductDetails';
import { Pattern } from '@/lib/pattern/pattern';

export interface PdfPageProps {
	product: ProductDetails;
	pattern: Pattern;
}
