import { ColorChartPage } from './pdf/ColorChartPage';
import { CoverPage } from './pdf/CoverPage';
import { SinglePatternPage } from './pdf/PatternPage';
import { CrossStitchPdfConfig } from '@infrastructure/pdf/types';

export * from './cover/StitchFairyCoCover';

export const StitchFairyCoModule: CrossStitchShopModule = {
	brandId: 'rec_cpc4clmotdb9928vhhog',
	pdf: {
		grid: {
			width: 60,
			height: 80,
		},
		pages: {
			pattern: SinglePatternPage,
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
		},
	},
};

export interface CrossStitchShopModule {
	brandId: string;
	pdf: CrossStitchPdfConfig;
}
