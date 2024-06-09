import { ProductDetails } from '@/domain/product/ProductDetails';
import { StitchFairyCoPdf } from '@/brand/StitchFairyCo/pdf/StitchFairyCoPdf';

export const renderPatternFileHtml = async (product: ProductDetails) => {
	const renderToString = (await import('react-dom/server')).renderToString;
	return renderToString(<StitchFairyCoPdf product={product} />);
};
