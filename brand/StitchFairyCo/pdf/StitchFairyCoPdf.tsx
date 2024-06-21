import { FullProductObject } from '@domain/product';
import { ColorChartPage } from './pages/ColorChartPage';
import { CoverPage } from './pages/CoverPage';
import { PatternPages } from './pages/PatternPage';

export interface PrintableStitchCrossPdfProps {
	product: FullProductObject;
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
