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

export interface CrossStitchPdfConfig {
	front: CrossStitchPdfPageTemplate[];
	back: CrossStitchPdfPageTemplate[];
	pattern: (props: CrossStitchPdfPatternPageProps) => JSX.Element;
}

export interface CrossStitchPdfPageTemplate {
	name: string;
	render: (props: CrossStitchPdfPageProps) => JSX.Element;
}
