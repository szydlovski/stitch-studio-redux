'use client';
import { getSquarePadding } from '@/lib/helpers';
import { PatternRenderer } from '@/lib/pattern/PatternRenderer';
import { loadStitchTextureDictionary } from '@/lib/pattern/helpers';
import { Pattern } from '@/lib/pattern/pattern';
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
	flossColor1: string;
	flossColor2: string;
	flossColor3: string;
	flossColor4: string;
	flossColor5: string;
	fabricColor: string;
	frameColor: string;
	pinterestBarColor: string;
}

export const renderStitchFairyCovers = async ({
	pattern,
	flossColor1,
	flossColor2,
	flossColor3,
	flossColor4,
	flossColor5,
	fabricColor,
	frameColor,
	pinterestBarColor,
}: RenderStitchFairyCoversProps) => {
	const renderer = new PatternRenderer(await loadStitchTextureDictionary());
	const templateRenderer = new TemplateRenderer();
	const embroideryMockup = renderer.renderEmbroideryOnFabricMockup(
		pattern,
		5,
		getSquarePadding(pattern, 0.15)
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

	const frameMockup = await render(frameMockupTemplate, {
		pattern: embroideryMockup,
		color: frameColor,
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
		barColor: pinterestBarColor,
		loopMockup: loopMockup,
		flossMockup: flossMockup,
		fabricMockup: fabricMockup,
	});

	const frameCover = await render(frameCoverTemplate, {
		frameMockup: frameMockup,
		backgroundColor: '#ddd',
	});

	return [squareCover, etsyCover, wideCover, frameCover, pinterest1];
};
