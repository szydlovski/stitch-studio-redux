import { ProductDetails } from '@domain/product/ProductDetails';
import { ColorChartPage } from './pages/ColorChartPage';
import { CoverPage } from './pages/CoverPage';
import { PatternPages } from './pages/PatternPage';

export interface PrintableStitchCrossPdfProps {
	product: ProductDetails;
}

export const StitchFairyCoPdf = ({ product }: PrintableStitchCrossPdfProps) => {
	return (
		<>
			<CoverPage product={product} />
			<ColorChartPage product={product} />
			<PatternPages product={product} />
		</>
	);
};
