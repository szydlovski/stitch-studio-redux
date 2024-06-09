import { ProductDetails } from '@/domain/product/ProductDetails';
import { cssStyles } from './css';
import { ColorChartPage } from './pages/ColorChartPage';
import { CoverPage } from './pages/CoverPage';
import { PatternPages } from './pages/PatternPage';

export interface PrintableStitchCrossPdfProps {
	product: ProductDetails;
}

export const StitchFairyCoPdf = ({ product }: PrintableStitchCrossPdfProps) => {
	return (
		<>
			<style>{cssStyles}</style>
			<CoverPage product={product} />
			<ColorChartPage product={product} />
			<PatternPages product={product} />
		</>
	);
};
