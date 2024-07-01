import { createCanvas } from '@lib/canvas';
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
} from './templates';
import {
	CustomizableCoverTemplate,
	RenderCoverProps,
} from '@presentation/views/ProductView/tabs/images/components/CoverCustomizer/types';
import { CrossStitchPattern } from '@domain/cross-stitch';
import { HoopMockupConfig } from '@domain/product/types';
import { RendererContextType } from '@components/context/RendererContext';

const targetDim = { width: 877, height: 941 };

const renderStitchFairyCommons = ({
	pattern,
	config,
	context: { templateRenderer, crossStitchRenderer },
}: RenderCoverProps) => {
	const { colors, scale } = config;
	const side = Math.max(pattern.width, pattern.height);

	const embroideryMockup = createCanvas(targetDim, (ctx) => {
		const renderScale = 1 + scale * 2;
		const width = targetDim.width * renderScale;
		const height = targetDim.height * renderScale;
		ctx.drawImage(
			crossStitchRenderer.renderEmbroideryOnFabricMockup(
				pattern,
				5,
				{
					top: side,
					bottom: side,
					left: side,
					right: side,
				},
				colors.background
			),
			-width / 2 + targetDim.width / 2 + (config.xOffset / 1000) * width,
			-height / 2 + targetDim.height / 2 + (config.yOffset / 1000) * height,
			width,
			height
		);
	});

	const render = templateRenderer.renderTemplate.bind(templateRenderer);

	const loopMockup = render(loopMockupTemplate, {
		patternRender: embroideryMockup,
	});

	const flossMockup = render(flossMockupTemplate, {
		color1: colors.floss1,
		color2: colors.floss2,
		color3: colors.floss3,
		color4: colors.floss4,
		color5: colors.floss5,
	});

	const fabricMockup = render(fabricMockupTemplate, {
		color: colors.fabric,
	});

	return { embroideryMockup, loopMockup, flossMockup, fabricMockup };
};

export interface RenderHoopMockupProps {
	pattern: CrossStitchPattern;
	config: HoopMockupConfig;
	context: RendererContextType;
}

export const renderHoopMockup = (
	{
		pattern,
		config,
		context: { templateRenderer, crossStitchRenderer },
	}: RenderHoopMockupProps,
	ctx: CanvasRenderingContext2D
) => {
	const { background, scale } = config;
	const side = Math.max(pattern.width, pattern.height);

	const embroideryMockup = createCanvas(targetDim, (ctx) => {
		const renderScale = 1 + scale * 2;
		const width = targetDim.width * renderScale;
		const height = targetDim.height * renderScale;
		ctx.drawImage(
			crossStitchRenderer.renderEmbroideryOnFabricMockup(
				pattern,
				5,
				{
					top: side,
					bottom: side,
					left: side,
					right: side,
				},
				background
			),
			-width / 2 + targetDim.width / 2 + (config.xOffset / 1000) * width,
			-height / 2 + targetDim.height / 2 + (config.yOffset / 1000) * height,
			width,
			height
		);
	});

	templateRenderer.renderTemplateOnCanvas(
		loopMockupTemplate,
		{
			patternRender: embroideryMockup,
		},
		ctx
	);
};

export const StitchFairyCoCover: CustomizableCoverTemplate = {
	name: 'StitchFairyCo',
	renderPreview: (props: RenderCoverProps, ctx: CanvasRenderingContext2D) => {
		const { templateRenderer } = props.context;
		templateRenderer.renderTemplateOnCanvas(
			etsyCoverTemplate,
			renderStitchFairyCommons(props),
			ctx
		);
	},
	renderCovers: async (props: RenderCoverProps) => {
		const {
			config,
			context: { templateRenderer },
		} = props;
		const { colors } = config;
		const { embroideryMockup, loopMockup, flossMockup, fabricMockup } =
			renderStitchFairyCommons(props);
		const render = templateRenderer.renderTemplate.bind(templateRenderer);

		const frameMockup = render(frameMockupTemplate, {
			pattern: embroideryMockup,
			color: colors.frame,
		});

		return [
			{
				key: 'cover_square',
				canvas: render(squareCoverTemplate, {
					loopMockup: loopMockup,
					flossMockup: flossMockup,
					fabricMockup: fabricMockup,
				}),
			},
			{
				key: 'cover_etsy',
				canvas: render(etsyCoverTemplate, {
					loopMockup: loopMockup,
					flossMockup: flossMockup,
					fabricMockup: fabricMockup,
				}),
			},
			{
				key: 'cover_wide',
				canvas: render(wideCoverTemplate, {
					loopMockup: loopMockup,
					flossMockup: flossMockup,
					fabricMockup: fabricMockup,
				}),
			},
			{
				key: 'cover_frame',
				canvas: render(frameCoverTemplate, {
					frameMockup: frameMockup,
					backgroundColor: '#ddd',
				}),
			},
			{
				key: 'pinterest_1',
				canvas: render(pinterest1Template, {
					barColor: colors.pinterestBar,
					loopMockup: loopMockup,
					flossMockup: flossMockup,
					fabricMockup: fabricMockup,
				}),
			},
		];
	},
	controls: {
		background: {
			side: 'top',
			x: 0.73,
			y: 0.23,
			palette: ['#242424', '#fefefe'],
		},
		fabric: {
			side: 'top',
			x: 0.92,
			y: 0.57,
			palette: [],
		},
		floss1: {
			side: 'left',
			x: 0.04,
			y: 0.68,
			palette: [],
		},
		floss2: {
			side: 'left',
			x: 0.08,
			y: 0.73,
			palette: [],
		},
		floss3: {
			side: 'left',
			x: 0.11,
			y: 0.79,
			palette: [],
		},
		floss4: {
			side: 'left',
			x: 0.13,
			y: 0.85,
			palette: [],
		},
		floss5: {
			side: 'bottom',
			x: 0.15,
			y: 0.91,
			palette: [],
		},
	},
};
