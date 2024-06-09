import { ProductDetails } from '@/domain/product/ProductDetails';
import { DocumentContainer } from './components/DocumentContainer';
import { cssStyles } from './css';
import { ColorChartPage } from './pages/ColorChartPage';
import { CoverPage } from './pages/CoverPage';
import { PatternPages } from './pages/PatternPage';

export const renderPatternFileHtml = async (product: ProductDetails) => {
	const renderToString = (await import('react-dom/server')).renderToString;
	return renderToString(
		<DocumentContainer
			title={`[PREVIEW] ${product.title}`}
			cssStyles={cssStyles}
		>
			<CoverPage product={product} />
			<ColorChartPage product={product} />
			<PatternPages product={product} />
		</DocumentContainer>
	);
};
