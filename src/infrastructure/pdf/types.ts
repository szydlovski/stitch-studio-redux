import { FullProductObject } from '@domain/product';

export interface CrossStitchPdfPageProps {
	product: FullProductObject;
}

export interface CrossStitchPdfPatternPageProps
	extends CrossStitchPdfPageProps {
	index: number;
	xOffset?: number;
	yOffset?: number;
}

export interface CrossStitchPdfPageTemplate {
	name: string;
	render: (props: CrossStitchPdfPageProps) => JSX.Element;
}

export interface CrossStitchPdfConfig {
	grid: {
		width: number;
		height: number;
	};
	pages: {
		pattern: (props: CrossStitchPdfPatternPageProps) => JSX.Element;
		front?: CrossStitchPdfPageTemplate[];
		back?: CrossStitchPdfPageTemplate[];
	};
}
