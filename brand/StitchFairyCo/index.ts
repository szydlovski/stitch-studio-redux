import { ColorChartPage } from './pdf/ColorChartPage';
import { CoverPage } from './pdf/CoverPage';
import { SinglePatternPage } from './pdf/PatternPage';
import { CrossStitchPdfConfig } from '@infrastructure/pdf/types';

export * from './cover/StitchFairyCoCover';

export const STITCH_FAIRY_CO_RECORD_ID = 'rec_cpc4clmotdb9928vhhog';
export const SITCHFAIRYCO_ETSY_SHOP_ID = 26269414;
export const SITCHFAIRYCO_ETSY_USER_ID = 398998995;
export const STITCHFAIRYCO_ETSY_EXAMPLE_LISTING_ID = 1029506681;

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
