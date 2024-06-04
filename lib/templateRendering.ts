'use client';
import { CoverGeneratorState } from '@/components/CoverGenerator/reducer';
import { getSquarePadding } from '@/lib/helpers';
import { PatternRenderer } from '@/lib/pattern/PatternRenderer';
import { loadStitchTextureDictionary } from '@/lib/pattern/helpers';
import { Pattern } from '@/lib/pattern/pattern';
import { Padding } from '@/lib/pattern/types';
import { TemplateRenderer } from '@/lib/template/TemplateRenderer';
import {
	etsyCoverTemplate,
	fabricMockupTemplate,
	flossMockupTemplate,
	frameCoverTemplate,
	frameMockupTemplate,
	loopMockupTemplate,
	pinterest1Template,
	squareCoverTemplate,
	wideCoverTemplate,
} from '@/lib/template/templates';

interface RenderStitchFairyCoversProps {
	pattern: Pattern;
	state: CoverGeneratorState
}

export interface RenderedProductImage {
	canvas: HTMLCanvasElement;
	key: string;
}

export const renderStitchFairyCovers = async ({
	pattern,
	state,
}: RenderStitchFairyCoversProps) => {
	const renderer = new PatternRenderer(await loadStitchTextureDictionary());
	const templateRenderer = new TemplateRenderer();
	const embroideryMockup = renderer.renderEmbroideryOnFabricMockup(
		pattern,
		5,
		state.padding,
		state.colors.background
	);
	const render = templateRenderer.loadAndRenderTemplate.bind(templateRenderer);

	const loopMockup = await render(loopMockupTemplate, {
		patternRender: embroideryMockup,
	});

	const flossMockup = await render(flossMockupTemplate, {
		color1: state.colors.floss1,
		color2: state.colors.floss2,
		color3: state.colors.floss3,
		color4: state.colors.floss4,
		color5: state.colors.floss5,
	});

	const fabricMockup = await render(fabricMockupTemplate, {
		color: state.colors.fabric,
	});

	const frameMockup = await render(frameMockupTemplate, {
		pattern: embroideryMockup,
		color: state.colors.frame,
	});

	// end prep work

	const squareCover = await render(squareCoverTemplate, {
		loopMockup: loopMockup,
		flossMockup: flossMockup,
		fabricMockup: fabricMockup,
	});

	const etsyCover = await render(etsyCoverTemplate, {
		loopMockup: loopMockup,
		flossMockup: flossMockup,
		fabricMockup: fabricMockup,
	});

	const wideCover = await render(wideCoverTemplate, {
		loopMockup: loopMockup,
		flossMockup: flossMockup,
		fabricMockup: fabricMockup,
	});

	const pinterest1 = await render(pinterest1Template, {
		barColor: state.colors.pinterestBar,
		loopMockup: loopMockup,
		flossMockup: flossMockup,
		fabricMockup: fabricMockup,
	});

	const frameCover = await render(frameCoverTemplate, {
		frameMockup: frameMockup,
		backgroundColor: '#ddd',
	});

	const renderedCovers: RenderedProductImage[] = [
		{ canvas: squareCover, key: 'cover_square' },
		{ canvas: etsyCover, key: 'cover_etsy' },
		{ canvas: wideCover, key: 'cover_wide' },
		{ canvas: frameCover, key: 'cover_frame' },
		{ canvas: pinterest1, key: 'pinterest_1' },
	];

	return renderedCovers;
};

interface RenderStitchFairyMainCoverProps {
	pattern: Pattern;
	padding: Padding;
	backgroundColor: string;
	flossColor1: string;
	flossColor2: string;
	flossColor3: string;
	flossColor4: string;
	flossColor5: string;
	fabricColor: string;
}

export const renderStitchFairyMainCover = async ({
	pattern,
	padding,
	backgroundColor,
	flossColor1,
	flossColor2,
	flossColor3,
	flossColor4,
	flossColor5,
	fabricColor,
}: RenderStitchFairyMainCoverProps) => {
	const renderer = new PatternRenderer(await loadStitchTextureDictionary());
	const templateRenderer = new TemplateRenderer();
	const embroideryMockup = renderer.renderEmbroideryOnFabricMockup(
		pattern,
		5,
		padding,
		backgroundColor
	);
	const render = templateRenderer.loadAndRenderTemplate.bind(templateRenderer);

	const loopMockup = await render(loopMockupTemplate, {
		patternRender: embroideryMockup,
	});

	const flossMockup = await render(flossMockupTemplate, {
		color1: flossColor1,
		color2: flossColor2,
		color3: flossColor3,
		color4: flossColor4,
		color5: flossColor5,
	});

	const fabricMockup = await render(fabricMockupTemplate, {
		color: fabricColor,
	});

	// end prep work

	const etsyCover = await render(etsyCoverTemplate, {
		loopMockup: loopMockup,
		flossMockup: flossMockup,
		fabricMockup: fabricMockup,
	});

	return etsyCover;
};

export const renderLoopMockup = async (pattern: Pattern, padding: Padding) => {
	const renderer = new PatternRenderer(await loadStitchTextureDictionary());
	const templateRenderer = new TemplateRenderer();
	const embroideryMockup = renderer.renderEmbroideryOnFabricMockup(
		pattern,
		5,
		padding
	);
	const render = templateRenderer.loadAndRenderTemplate.bind(templateRenderer);

	const loopMockup = await render(loopMockupTemplate, {
		patternRender: embroideryMockup,
	});
	return loopMockup;
};
