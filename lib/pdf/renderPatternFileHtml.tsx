import { ProductDetails } from '@/domain/product/ProductDetails';
import { Pattern } from '@/lib/pattern/pattern';
import { DocumentContainer } from './components/DocumentContainer';
import { cssStyles } from './css';
import { ColorChartPage } from './pages/ColorChartPage';
import { CoverPage } from './pages/CoverPage';
import { PatternPage } from './pages/PatternPage';

export const renderPatternFileHtml = async (product: ProductDetails) => {
	const renderToString = (await import('react-dom/server')).renderToString;
	const pattern = Pattern.fromData(product.data);
	return renderToString(
		<DocumentContainer title={`[PREVIEW] ${product.title}`} cssStyles={cssStyles}>
			{[CoverPage, ColorChartPage, PatternPage].map((Component, i) => (
				<Component key={i} product={product} pattern={pattern} />
			))}
		</DocumentContainer>
	);
};
