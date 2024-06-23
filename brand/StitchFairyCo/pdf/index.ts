import { ReactNode } from 'react';
import { ColorChartPage } from './pages/ColorChartPage';
import { CoverPage } from './pages/CoverPage';
import { SinglePatternPage } from './pages/PatternPage';
import { CrossStitchPdfConfig } from './types';
import { FullProductObject } from '@domain/product';

export const SFC_MODULE: CrossStitchPdfConfig = {
	front: [
		{
			name: 'Cover page',
			render: CoverPage,
		},
		{
			name: 'Color chart page',
			render: ColorChartPage,
		},
	],
	back: [],
	pattern: SinglePatternPage,
};
